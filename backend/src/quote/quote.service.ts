import { Inject, Injectable } from '@nestjs/common';
import { Quote } from './quote.entity';
import { Repository } from 'typeorm';
import { DefaultQuoteLine } from './default-quote-line.entity';
import { QuoteLine } from './quote-line.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { AppError } from 'src/error/app-error.exception';
import { PaginatedResponse } from 'src/pagination/paginated-response';
import { PageQuery } from 'src/pagination/page-query';

@Injectable()
export class QuoteService {
  constructor(
    @Inject('QUOTE_REPOSITORY')
    private quoteRepository: Repository<Quote>,
    @Inject('DEFAULT_QUOTE_LINE_REPOSITORY')
    private defaultQuoteLineRepository: Repository<DefaultQuoteLine>,
    @Inject('QUOTE_LINE_REPOSITORY')
    private quoteLineRepository: Repository<QuoteLine>,
    private readonly userService: UserService,
  ) {}

  async findAllDefaultQuoteLines(
    email: string,
    page: number,
    limit: number,
    search: string,
  ): Promise<PaginatedResponse<DefaultQuoteLine>> {
    const [defaultQuoteLines, totalCount] = await this.defaultQuoteLineRepository.findAndCount({
      where: {
        user: { email },
        description: search ? search : undefined,
      },
      skip: page * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return new PaginatedResponse<DefaultQuoteLine>(defaultQuoteLines, new PageQuery(page, limit), totalCount);
  }

  async createDefaultQuoteLine(email: string, description: string, unitPrice: number): Promise<DefaultQuoteLine> {
    const defaultQuoteLine = new DefaultQuoteLine(description, unitPrice);
    defaultQuoteLine.user = await this.userService.findByEmail(email);
    return this.defaultQuoteLineRepository.save(defaultQuoteLine);
  }

  async updateDefaultQuoteLine(
    email: string,
    id: number,
    description: string,
    unitPrice: number,
  ): Promise<DefaultQuoteLine> {
    const defaultQuoteLine = await this.defaultQuoteLineRepository.findOne({ where: { id }, relations: ['user'] });
    this.checkIfAuthorized(defaultQuoteLine.user, email);
    defaultQuoteLine.description = description;
    defaultQuoteLine.unitPrice = unitPrice;
    return this.defaultQuoteLineRepository.save(defaultQuoteLine);
  }

  async deleteDefaultQuoteLine(email: string, id: number): Promise<void> {
    const defaultQuoteLine = await this.defaultQuoteLineRepository.findOne({ where: { id }, relations: ['user'] });
    this.checkIfAuthorized(defaultQuoteLine.user, email);
    await this.defaultQuoteLineRepository.delete(id);
  }

  checkIfAuthorized(user: User, email: string): void {
    if (user.email !== email) {
      throw new AppError('You are not authorized to access this resource', 403);
    }
  }
}
