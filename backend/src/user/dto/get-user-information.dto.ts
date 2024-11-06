import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';
import { GetCompanyDto, mapFromCompanyEntity } from './get-company.dto';

export class GetUserInformationDto {
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
    example: 'john.doe@test.test',
  })
  email: string;

  @ApiProperty({
    description: 'The phone of the customer',
    type: String,
    example: 'XXXXXXXXXXX',
  })
  phone: string;

  @ApiProperty({
    description: 'The company of the user',
    type: String,
  })
  company: GetCompanyDto;
}

export const mapFromEntity = (user: User): GetUserInformationDto => {
  const dto = new GetUserInformationDto();
  dto.id = user.id;
  dto.firstName = user.firstName;
  dto.lastName = user.lastName;
  dto.email = user.email;
  dto.phone = user.phone;
  dto.company = mapFromCompanyEntity(user.company);
  return dto;
};
