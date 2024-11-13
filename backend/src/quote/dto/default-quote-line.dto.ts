import { ApiProperty } from '@nestjs/swagger';
import { DefaultQuoteLine } from '../default-quote-line.entity';

export class DefaultQuoteLineDto {
  @ApiProperty({
    description: 'Id of the default quote line',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Description of the default quote line',
    type: String,
    example: 'Default quote line description',
  })
  description: string;

  @ApiProperty({
    description: 'Unit price of the default quote line',
    type: Number,
    example: 100,
  })
  unitPrice: number;

  constructor(defaultQuoteLine: DefaultQuoteLine) {
    this.id = defaultQuoteLine.id;
    this.description = defaultQuoteLine.description;
    this.unitPrice = defaultQuoteLine.unitPrice;
  }
}

export const mapFromDefaultQuoteLineToDefaultQuoteLineDto = (
  defaultQuoteLines: DefaultQuoteLine[],
): DefaultQuoteLineDto[] => {
  return defaultQuoteLines.map((defaultQuoteLine) => new DefaultQuoteLineDto(defaultQuoteLine));
};
