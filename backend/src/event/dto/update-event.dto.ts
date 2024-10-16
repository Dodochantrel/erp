import { ApiProperty } from '@nestjs/swagger';
import dayjs from 'dayjs';
import { Event } from './../event.entity';

export class UpdateEventDto {
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
    type: Number,
    example: 1,
    required: true,
  })
  typeId: number;
}

export const mapFromDtoToEntity = (dto: UpdateEventDto): Event => {
  const event = new Event(dayjs(dto.start), dayjs(dto.end), dto.title);
  event.description = dto.description;
  return event;
};
