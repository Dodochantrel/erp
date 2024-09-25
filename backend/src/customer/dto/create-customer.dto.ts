import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer.entity';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The first name of the customer',
    type: String,
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the customer',
    type: String,
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'The email of the customer',
    type: String,
    example: 'john.doe@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the customer',
    type: String,
    example: '+1234567890',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'The address of the customer',
    type: String,
    example: '123 Main St',
  })
  address: string;

  @ApiProperty({
    description: 'The city of the customer',
    type: String,
    example: 'New York',
  })
  city: string;

  @ApiProperty({
    description: 'The country of the customer',
    type: String,
    example: 'USA',
  })
  country: string;
}

export const mapFromDtoToEntity = (dto: CreateCustomerDto): Customer => {
  const customer = new Customer(dto.firstName, dto.lastName);
  customer.email = dto.email;
  customer.phoneNumber = dto.phoneNumber;
  customer.address = dto.address;
  customer.city = dto.city;
  customer.country = dto.country;
  return customer;
};
