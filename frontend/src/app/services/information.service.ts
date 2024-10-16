import { Injectable } from '@angular/core';
import { api } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  constructor(private readonly httpClient: HttpClient) {}

  prepareUrl(url: string = ''): string {
    return `${api.url}/information/${url}`;
  }

  getInformation(): Observable<any> {
    return this.httpClient.get<any>(this.prepareUrl());
  }
}
