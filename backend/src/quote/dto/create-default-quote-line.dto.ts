import { ApiProperty } from '@nestjs/swagger';

export class DefaultQuoteLineDto {
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
}
