import { Inject, Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
    private readonly userService: UserService,
  ) {}

  async create(customer: Customer, email: string): Promise<Customer> {
    customer.user = await this.userService.findByEmail(email);
    return this.customerRepository.save(customer);
  }

  async findAll(email: string): Promise<Customer[]> {
    const user = await this.userService.findByEmail(email);
    return this.customerRepository.find({ where: { user: user } });
  }

  async findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({ where: { id } });
  }

  async update(id: number, customer: Customer): Promise<Customer> {
    return this.customerRepository.save({ ...customer, id: id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.customerRepository.delete(id);
  }
}
