import { Inject, Injectable } from '@nestjs/common';
import { Quote } from './quote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuoteService {
  @Inject('QUOTE_REPOSITORY')
  private quoteRepository: Repository<Quote>;
}
