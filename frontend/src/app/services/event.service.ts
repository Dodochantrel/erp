import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../environments/environment';
import { Observable } from 'rxjs';
import { Event } from '../class/event';
import { Dayjs } from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private readonly httpClient: HttpClient) { }

  prepareUrl(url: string = ''): string {
    return `${api.url}/event/${url}`;
  }

  findAll(start: Dayjs, end: Dayjs): Observable<Event[]> {
    const startString = start.format('YYYY-MM-DDTHH:mm:ss');
    const endString = end.format('YYYY-MM-DDTHH:mm:ss');
    return this.httpClient.get<Event[]>(this.prepareUrl(`start=${startString}&end=${endString}`));
  }
}
