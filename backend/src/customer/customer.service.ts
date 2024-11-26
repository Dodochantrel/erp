import { Inject, Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PaginatedResponse } from 'src/pagination/paginated-response';
import { PageQuery } from 'src/pagination/page-query';
import { AppError } from 'src/error/app-error.exception';

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

  async findAll(email: string, page: number, limit: number, search: string): Promise<PaginatedResponse<Customer>> {
    const user = await this.userService.findByEmail(email);

    const queryBuilder = this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.userId = :userId', { userId: user.id })
      .orderBy('customer.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search != 'null') {
      this.prepareQuerySearch(search, queryBuilder);
    }

    const [customers, totalCount] = await queryBuilder.getManyAndCount();

    return new PaginatedResponse(customers, new PageQuery(page, limit), totalCount);
  }

  prepareQuerySearch(search: string, queryBuilder: SelectQueryBuilder<Customer>): SelectQueryBuilder<Customer> {
    // SI search contient un espace)
    if (search.includes(' ')) {
      const [first, second] = search.split(' ');
      return queryBuilder.andWhere(
        '((customer.firstName LIKE :first AND customer.lastName LIKE :second) OR (customer.lastName LIKE :first AND customer.firstName LIKE :second))',
        {
          first: `%${first}%`,
          second: `%${second}%`,
        },
      );
    } else {
      return queryBuilder.andWhere(
        '(customer.firstName LIKE :search OR customer.lastName LIKE :search OR customer.email LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }
  }

  async findOne(id: number, email: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id }, relations: ['user'] });
    this.checkIfAuthorized(customer, email);
    return customer;
  }

  async update(id: number, customer: Customer, email: string): Promise<Customer> {
    const customerInDb = await this.customerRepository.findOne({ where: { id }, relations: ['user'] });
    this.checkIfAuthorized(customerInDb, email);
    return this.customerRepository.save({ ...customer, id: id });
  }

  async remove(id: number, email: string): Promise<DeleteResult> {
    const customer = await this.customerRepository.findOne({ where: { id }, relations: ['user'] });
    this.checkIfAuthorized(customer, email);
    return this.customerRepository.delete(id);
  }

  checkIfAuthorized(customer: Customer, email: string): void {
    if (customer.user.email !== email) {
      throw new AppError('You are not authorized to access this resource', 403);
    }
  }

  findNames(email: string): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { user: { email } },
      select: ['id', 'firstName', 'lastName', 'isCompany', 'companyName'],
    });
  }
}
