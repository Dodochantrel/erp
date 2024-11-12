import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../environments/environment';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  prepareUrl(url: string = ''): string {
    return `${api.url}/user/${url}`;
  }

  patchUser(
    company: string | null,
    siret: string | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    phone: string | null,
    address: string | null,
    city: string | null,
    logoEncodedBase64: string | null,
    zipCode: number | null
  ) {
    return this.http.patch(`${this.prepareUrl('my-self')}`, {
      company,
      siret,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      logoEncodedBase64,
      zipCode,
    });
  }

  getUser() {
    return this.http.get<User>(`${this.prepareUrl('my-self')}`);
  }
}
