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

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export const mapFromEntityToDto = (entity: Customer): GetCustomersNamesDto => {
  return new GetCustomersNamesDto(entity.id, entity.firstName, entity.lastName);
};

export const mapFromEntitiesToDto = (entities: Customer[]): GetCustomersNamesDto[] => {
  return entities.map((entity) => mapFromEntityToDto(entity));
};
