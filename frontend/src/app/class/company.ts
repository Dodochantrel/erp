import { Dayjs } from 'dayjs';

export class Company {
  id: number;
  name: string | null;
  siret: string | null;
  company: string | null;
  logoEncodedBase64: string | null;
  address: string | null;
  city: string | null;
  zipCode: number | null;
  createdAt: Date | null;
  updatedAt: Dayjs | null;

  constructor(
    id: number,
    name: string | null = null,
    siret: string | null = null,
    company: string | null = null,
    logoEncodedBase64: string | null = null,
    address: string | null = null,
    city: string | null = null,
    zipCode: number | null = null,
    createdAt: Date | null = null,
    updatedAt: Dayjs | null = null
  ) {
    this.id = id;
    this.name = name;
    this.siret = siret;
    this.company = company;
    this.logoEncodedBase64 = logoEncodedBase64;
    this.address = address;
    this.city = city;
    this.zipCode = zipCode;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
