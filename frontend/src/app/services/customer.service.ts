import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../environments/environment';
import { Customer } from '../class/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private readonly httpClient: HttpClient) { }

  prepareUrl(url: string = ''): string {
    return `${api.url}/customer/${url}`;
  }

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.prepareUrl());
  }
}
