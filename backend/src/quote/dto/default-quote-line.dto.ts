import { ApiProperty } from '@nestjs/swagger';
import { DefaultQuoteLine } from '../default-quote-line.entity';
import { PageQuery } from 'src/pagination/page-query';
import { PaginatedResponse } from 'src/pagination/paginated-response';

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
  defaultQuoteLines: PaginatedResponse<DefaultQuoteLine>,
  pageQuery: PageQuery,
): PaginatedResponse<DefaultQuoteLineDto> => {
  const newPageQuery = new PageQuery(+pageQuery.page, +pageQuery.limit);
  const paginatedDto = new PaginatedResponse<DefaultQuoteLineDto>(
    defaultQuoteLines.data.map((defaultQuoteLine) => new DefaultQuoteLineDto(defaultQuoteLine)),
    newPageQuery,
    defaultQuoteLines.meta.itemCount,
  );
  return paginatedDto;
};
