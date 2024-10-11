import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer.entity';
import { PaginatedResponse } from 'src/pagination/paginated-response';
import { PageQuery } from 'src/pagination/page-query';

export class GetCustomerDto {
  @ApiProperty({
    description: 'The id of the customer',
    type: Number,
    example: 1,
  })
  id: number;

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
    description: 'The zip code of the customer',
    type: String,
    example: '12345',
  })
  zipCode: string;

  @ApiProperty({
    description: 'The country of the customer',
    type: String,
    example: 'USA',
  })
  country: string;
}

export const mapFromEntityToDto = (entity: Customer): GetCustomerDto => {
  const dto = new GetCustomerDto();
  dto.id = entity.id;
  dto.firstName = entity.firstName;
  dto.lastName = entity.lastName;
  dto.email = entity.email;
  dto.phoneNumber = entity.phoneNumber;
  dto.address = entity.address;
  dto.city = entity.city;
  dto.country = entity.country;
  dto.zipCode = entity.zipCode;
  return dto;
};

export const mapFromEntitiesPaginatedToDto = (
  paginatedEntities: PaginatedResponse<Customer>,
  pageQuery: PageQuery,
): PaginatedResponse<GetCustomerDto> => {
  const newPageQuery = new PageQuery(+pageQuery.page, +pageQuery.limit);
  const paginatedDto = new PaginatedResponse<GetCustomerDto>(
    paginatedEntities.data.map(mapFromEntityToDto),
    newPageQuery,
    paginatedEntities.meta.itemCount,
  );
  return paginatedDto;
};
