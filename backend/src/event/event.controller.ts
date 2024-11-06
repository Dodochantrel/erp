import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, mapFromDtoToEntity } from './dto/create-event.dto';
import { UserEmail } from 'src/user/user-email.decorator';
import * as dayjs from 'dayjs';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDto, mapFromEntityToDto } from './dto/get-event.dto';
import { CreateTypeEventDto, mapFromDtoToTypeEvent } from './dto/create-type-event.dto';
import { TypeEventDto } from './dto/get-type-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() dto: CreateEventDto, @UserEmail() email: string): Promise<EventDto> {
    return mapFromEntityToDto(await this.eventService.create(mapFromDtoToEntity(dto), email, dto.typeId, dto.customer));
  }

  @Post('type')
  async createType(@Body() dto: CreateTypeEventDto, @UserEmail() email: string): Promise<TypeEventDto> {
    return await this.eventService.createType(mapFromDtoToTypeEvent(dto), email);
  }

  @Get('type')
  async findAllType(@UserEmail() email: string): Promise<TypeEventDto[]> {
    return await this.eventService.findAllType(email);
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
    return mapFromEntityToDto(
      await this.eventService.update(+id, mapFromDtoToEntity(dto), email, dto.typeId, dto.customer),
    );
  }

  @Delete(':id')
  async remove(@UserEmail() email: string, @Query('id') id: string) {
    return await this.eventService.remove(+id, email);
  }
}
