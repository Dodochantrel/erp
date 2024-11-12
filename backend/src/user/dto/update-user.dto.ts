import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';
import { Company } from '../company.entity';

export class UpdateUserDto {
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
    example: 'john.doe@test.test',
  })
  email: string;

  @ApiProperty({
    description: 'The siret of the customer',
    type: String,
    example: 'XXX-XXX-XXX XXXXX',
  })
  siret: string;

  @ApiProperty({
    description: 'The company of the customer',
    type: String,
    example: 'John Doe Company',
  })
  company: string;

  @ApiProperty({
    description: 'The logo of the customer',
    type: String,
    example: 'logo.png',
  })
  logoEncodedBase64: string;

  @ApiProperty({
    description: 'The phone of the customer',
    type: String,
    example: 'XXXXXXXXXXX',
  })
  phone: string;

  @ApiProperty({
    description: 'The address of the customer',
    type: String,
    example: '1, rue de la Paix',
  })
  address: string;

  @ApiProperty({
    description: 'The city of the customer',
    type: String,
    example: 'Paris',
  })
  city: string;

  @ApiProperty({
    description: 'The postal code of the customer',
    type: String,
    example: '75000',
  })
  zipCode: string;
}

export const mapFromDtoToEntity = (dto: UpdateUserDto) => {
  const user = new User();
  const company = new Company();
  user.firstName = dto.firstName;
  user.lastName = dto.lastName;
  user.email = dto.email;
  user.phone = dto.phone;
  company.siret = dto.siret;
  company.name = dto.company;
  company.logoEncodedBase64 = dto.logoEncodedBase64;
  user.phone = dto.phone;
  company.address = dto.address;
  company.city = dto.city;
  company.zipCode = dto.zipCode;
  user.company = company;
  return user;
};
