import { ApiProperty } from '@nestjs/swagger';
import { TypeEvent } from '../type-event.entity';

export class CreateTypeEventDto {
  @ApiProperty({
    description: 'Name of the type',
    type: String,
    example: 'Meeting',
  })
  name: string;

  @ApiProperty({
    description: 'Color of the type',
    type: String,
    example: '#FF0000',
  })
  color: string;
}

export const mapFromDtoToTypeEvent = (dto: CreateTypeEventDto): TypeEvent => {
  const typeEvent = new TypeEvent(dto.name, dto.color);
  return typeEvent;
};
