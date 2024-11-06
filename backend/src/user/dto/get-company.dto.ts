import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../company.entity';

export class GetCompanyDto {
  @ApiProperty({
    description: 'The id of the company',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The siret of the company',
    type: String,
    example: 'XXX-XXX-XXX XXXXX',
  })
  siret: string;

  @ApiProperty({
    description: 'The name of the company',
    type: String,
    example: 'John Doe Company',
  })
  name: string;

  @ApiProperty({
    description: 'The logo of the company',
    type: String,
    example: 'logo.png',
  })
  logoEncodedBase64: string;

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
  postalCode: string;
}

export const mapFromCompanyEntity = (company: Company): GetCompanyDto => {
  const dto = new GetCompanyDto();
  dto.id = company.id;
  dto.siret = company.siret;
  dto.name = company.name;
  dto.logoEncodedBase64 = company.logoEncodedBase64;
  dto.address = company.address;
  dto.city = company.city;
  dto.postalCode = company.postalCode;
  return dto;
};
