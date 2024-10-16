import { ApiProperty } from '@nestjs/swagger';

export class TypeEventDto {
  @ApiProperty({
    description: 'Id of the event',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the type',
    type: String,
    example: 'meeting',
  })
  name: string;

  @ApiProperty({
    description: 'The color of the type',
    type: String,
    example: '#FF0000',
  })
  color: string;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}
