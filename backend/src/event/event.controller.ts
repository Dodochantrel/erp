import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, mapFromDtoToEntity } from './dto/create-event.dto';
import { UserEmail } from 'src/user/user-email.decorator';
import dayjs from 'dayjs';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDto, mapFromEntityToDto } from './dto/get-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() dto: CreateEventDto, @UserEmail() email: string): Promise<EventDto> {
    return mapFromEntityToDto(await this.eventService.create(mapFromDtoToEntity(dto), email));
  }

  @Get()
  async findAll(
    @UserEmail() email: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ): Promise<EventDto[]> {
    return (await this.eventService.findAll(email, dayjs(start), dayjs(end))).map(mapFromEntityToDto);
  }

  @Get(':id')
  async findOne(@UserEmail() email: string, @Query('id') id: string): Promise<EventDto> {
    return mapFromEntityToDto(await this.eventService.findOne(+id, email));
  }

  @Patch(':id')
  async update(@Body() dto: UpdateEventDto, @UserEmail() email: string, @Query('id') id: string): Promise<EventDto> {
    return mapFromEntityToDto(await this.eventService.update(+id, mapFromDtoToEntity(dto), email));
  }

  @Delete(':id')
  async remove(@UserEmail() email: string, @Query('id') id: string) {
    return await this.eventService.remove(+id, email);
  }
}
