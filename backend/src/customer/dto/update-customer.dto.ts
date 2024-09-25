import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { Customer } from '../customer.entity';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export const mapFromDtoUpdateToEntity = (dto: UpdateCustomerDto): Customer => {
  const customer = new Customer(dto.firstName, dto.lastName);
  customer.email = dto.email;
  customer.phoneNumber = dto.phoneNumber;
  customer.address = dto.address;
  customer.city = dto.city;
  customer.country = dto.country;
  return customer;
};
