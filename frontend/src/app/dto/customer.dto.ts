import { Customer } from "../class/customer";

export interface CustomerDto {
    id: number;
    isCompany: boolean;
    siret: string | null;
    companyName: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string | null;
    address: string | null;
    city: string | null;
    zipCode: string | null;
    country: string | null;
}

export const customerDtoToCustomer = (dto: CustomerDto): Customer => {
    const customer = new Customer(
        dto.id,
        dto.isCompany
    );
    customer.siret = dto.siret;
    customer.companyName = dto.companyName;
    customer.firstName = dto.firstName;
    customer.lastName = dto.lastName;
    customer.email = dto.email;
    customer.phoneNumber = dto.phoneNumber;
    customer.address = dto.address;
    customer.city = dto.city;
    customer.zipCode = dto.zipCode;
    customer.country = dto.country;
    return customer;
}