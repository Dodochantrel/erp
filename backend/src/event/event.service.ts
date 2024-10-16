import { Inject, Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { AppError } from 'src/error/app-error.exception';
import { Dayjs } from 'dayjs';
import { TypeEvent } from './type-event.entity';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: Repository<Event>,
    @Inject('TYPE_EVENT_REPOSITORY')
    private typeEventRepository: Repository<TypeEvent>,
    private readonly userService: UserService,
  ) {}

  async create(event: Event, email: string, typeId: number): Promise<Event> {
    event.user = await this.userService.findByEmail(email);
    event.type = await this.typeEventRepository.findOne({ where: { id: typeId } });
    return this.eventRepository.save(event);
  }

  async createType(type: TypeEvent): Promise<TypeEvent> {
    return this.typeEventRepository.save(type);
  }

  async findAll(email: string, start: Dayjs, end: Dayjs): Promise<Event[]> {
    const user = await this.userService.findByEmail(email);

    return this.eventRepository.find({
      // Start > start && End < end
      where: {
        user: { id: user.id },
        start: MoreThan(start),
        end: LessThan(end),
      },
      relations: ['type'],
    });
  }

  async findAllType(): Promise<TypeEvent[]> {
    return this.typeEventRepository.find();
  }

  async findOne(id: number, email: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ['user', 'type'] });
    this.checkIfAuthorized(event, email);
    return event;
  }

  async update(id: number, event: Event, email: string, typeId: number): Promise<Event> {
    const existingEvent = await this.findOne(id, email);
    event.type = await this.typeEventRepository.findOne({ where: { id: typeId } });
    return this.eventRepository.save({ ...existingEvent, ...event });
  }

  async remove(id: number, email: string): Promise<void> {
    const event = await this.findOne(id, email);
    await this.eventRepository.remove(event);
  }

  checkIfAuthorized(event: Event, email: string): void {
    if (event.user.email !== email) {
      throw new AppError('You are not authorized to access this resource', 403);
    }
  }
}
