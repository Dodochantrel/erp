import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { UserEmail } from 'src/user/user-email.decorator';
import { DefaultQuoteLineDto, mapFromDefaultQuoteLineToDefaultQuoteLineDto } from './dto/default-quote-line.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get('default-quote-lines')
  async findAllType(@UserEmail() email: string): Promise<DefaultQuoteLineDto[]> {
    return mapFromDefaultQuoteLineToDefaultQuoteLineDto(await this.quoteService.findAllDefaultQuoteLines(email));
  }

  @Post('default-quote-lines')
  async createType(@UserEmail() email: string, @Body() dto: DefaultQuoteLineDto): Promise<DefaultQuoteLineDto> {
    return new DefaultQuoteLineDto(
      await this.quoteService.createDefaultQuoteLine(email, dto.description, dto.unitPrice),
    );
  }

  @Patch('default-quote-lines/:id')
  async updateType(
    @UserEmail() email: string,
    @Query('id') id: string,
    @Body() dto: DefaultQuoteLineDto,
  ): Promise<DefaultQuoteLineDto> {
    return new DefaultQuoteLineDto(
      await this.quoteService.updateDefaultQuoteLine(email, +id, dto.description, dto.unitPrice),
    );
  }

  @Delete('default-quote-lines/:id')
  async deleteType(@UserEmail() email: string, @Query('id') id: string): Promise<void> {
    await this.quoteService.deleteDefaultQuoteLine(email, +id);
  }
}
