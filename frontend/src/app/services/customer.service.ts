import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../environments/environment';
import { Customer } from '../class/customer';
import { map, Observable } from 'rxjs';
import { PaginatedResponse } from '../class/pagniated-response';
import { CustomerDto, customerDtoToCustomer } from '../dto/customer.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private readonly httpClient: HttpClient) {}

  isAddCustomer: boolean = false;
  isEditCustomer: boolean = false;

  handleIsAddCustomer(): void {
    this.isAddCustomer = !this.isAddCustomer;
  }

  handleIsEditCustomer(): void {
    this.isEditCustomer = !this.isEditCustomer;
  }

  prepareUrl(url: string = ''): string {
    return `${api.url}/customer/${url}`;
  }

  getOne(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.prepareUrl(`one/${id}`)).pipe(
      map((customers) => customerDtoToCustomer(customers))
    );
  }

  getCustomers(
    page: number = 1,
    limit: number = 10,
    search: string | null = null
  ): Observable<PaginatedResponse<Customer>> {
    return this.httpClient.get<PaginatedResponse<Customer>>(
      this.prepareUrl(`search/${search}?page=${page}&limit=${limit}`)
    );
  }

  getCustomersNames(): Observable<Customer[]> {
    return this.httpClient
      .get<CustomerDto[]>(this.prepareUrl('names'))
      .pipe(
        map((customers) =>
          customers.map((customer) => customerDtoToCustomer(customer))
        )
      );
  }

  save(
    isCompany: boolean,
    siret: string | null,
    companyName: string | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    phoneNumber: string | null,
    address: string | null,
    city: string | null,
    zipCode: string | null,
    country: string | null
  ): Observable<Customer> {
    const customer = {
      isCompany: isCompany,
      siret: siret ? siret : null,
      companyName: companyName ? companyName : null,
      firstName: firstName ? firstName : null,
      lastName: lastName ? lastName : null,
      email: email ? email : null,
      phoneNumber: phoneNumber ? phoneNumber : null,
      address: address ? address : null,
      city: city ? city : null,
      zipCode: zipCode ? zipCode : null,
      country: country ? country : null,
    };
    return this.httpClient.post<Customer>(this.prepareUrl(), customer);
  }

  delete(id: number): Observable<Customer> {
    return this.httpClient.delete<Customer>(this.prepareUrl(`${id}`));
  }

  patch(customer: Customer): Observable<Customer> {
    return this.httpClient.patch<Customer>(
      this.prepareUrl(`${customer.id}`),
      customer
    );
  }
}
