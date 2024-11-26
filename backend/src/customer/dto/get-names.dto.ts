import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer.entity';

export class GetCustomersNamesDto {
  @ApiProperty({
    description: 'The id of the customer',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Establish if the customer is a company or not',
    type: Boolean,
    example: true,
  })
  isCompany: boolean;

  @ApiProperty({
    description: 'Company name',
    type: String,
    example: 'Company Inc.',
  })
  companyName: string;

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

  constructor(
    id: number,
    isCompany: boolean,
    companyName: string | null = null,
    firstName: string | null = null,
    lastName: string | null = null,
  ) {
    this.id = id;
    this.isCompany = isCompany;
    this.companyName = companyName;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export const mapFromEntityToDto = (entity: Customer): GetCustomersNamesDto => {
  return new GetCustomersNamesDto(entity.id, entity.isCompany, entity.companyName, entity.firstName, entity.lastName);
};

export const mapFromEntitiesToDto = (entities: Customer[]): GetCustomersNamesDto[] => {
  return entities.map((entity) => mapFromEntityToDto(entity));
};
