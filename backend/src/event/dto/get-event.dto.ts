import { ApiProperty } from '@nestjs/swagger';
import { Event } from './../event.entity';
import { TypeEventDto } from './get-type-event.dto';

export class EventDto {
  @ApiProperty({
    description: 'Id of the event',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Start date of the event',
    type: String,
    example: '2021-01-01T00:00:00.000Z',
  })
  start: string;

  @ApiProperty({
    description: 'End date of the event',
    type: String,
    example: '2021-01-01T00:00:00.000Z',
  })
  end: string;

  @ApiProperty({
    description: 'Title of the event',
    type: String,
    example: 'Meeting with John',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the event',
    type: String,
    example: 'Meeting with John to discuss the project',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Type of the event',
    type: TypeEventDto,
  })
  type: TypeEventDto;
}

export const mapFromEntityToDto = (dto: Event): EventDto => {
  const eventDto = new EventDto();
  eventDto.id = dto.id;
  eventDto.start = dto.start.toISOString();
  eventDto.end = dto.end.toISOString();
  eventDto.title = dto.title;
  eventDto.description = dto.description;
  eventDto.type = dto.type;
  return eventDto;
};
