import { Inject, Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { IsNull, LessThan, MoreThan, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { AppError } from 'src/error/app-error.exception';
import { Dayjs } from 'dayjs';
import { TypeEvent } from './type-event.entity';
import { CustomerService } from 'src/customer/customer.service';
import { Customer } from 'src/customer/customer.entity';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: Repository<Event>,
    @Inject('TYPE_EVENT_REPOSITORY')
    private typeEventRepository: Repository<TypeEvent>,
    private readonly userService: UserService,
    private customerService: CustomerService,
  ) {}

  async create(event: Event, email: string, typeId: number, customer: Customer | null): Promise<Event> {
    event.user = await this.userService.findByEmail(email);
    event.customer = customer;
    event.type = await this.typeEventRepository.findOne({ where: { id: typeId } });
    console.log(event);
    return this.eventRepository.save(event);
  }

  async createType(type: TypeEvent, email: string): Promise<TypeEvent> {
    type.user = await this.userService.findByEmail(email);
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

  async findAllType(email: string): Promise<TypeEvent[]> {
    // Find all types for a specific user or with no user
    return this.typeEventRepository.find({ where: [{ user: { email } }, { user: IsNull() }] });
  }

  async findOne(id: number, email: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ['user', 'type'] });
    this.checkIfAuthorized(event, email);
    return event;
  }

  async update(id: number, event: Event, email: string, typeId: number, customer: Customer | null): Promise<Event> {
    const existingEvent = await this.findOne(id, email);
    event.customer = customer;
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
