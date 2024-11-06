import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../environments/environment';
import { Observable } from 'rxjs';
import { Event, TypeEvent } from '../class/event';
import { Dayjs } from 'dayjs';
import { Customer } from '../class/customer';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private readonly httpClient: HttpClient) { }

  isAddEvent: boolean = false;
  isEditEvent: boolean = false;

  handleIsAddEvent(): void {
    this.isAddEvent = !this.isAddEvent;
  }

  handleIsEditEvent(): void {
    this.isEditEvent = !this.isEditEvent;
  }

  prepareUrl(url: string = ''): string {
    return `${api.url}/event/${url}`;
  }

  findAll(start: Dayjs, end: Dayjs): Observable<Event[]> {
    const startString = start.format('YYYY-MM-DDTHH:mm:ss');
    const endString = end.format('YYYY-MM-DDTHH:mm:ss');
    return this.httpClient.get<Event[]>(this.prepareUrl(`?start=${startString}&end=${endString}`));
  }

  findAllType(): Observable<TypeEvent[]> {
    return this.httpClient.get<TypeEvent[]>(this.prepareUrl('type'));
  }

  createType(name: string, color: string): Observable<TypeEvent> {
    return this.httpClient.post<TypeEvent>(this.prepareUrl('type'), { name, color });
  }

  create(title: string, start: Dayjs, end: Dayjs, Type: TypeEvent, description: string | null, customer: Customer | null): Observable<Event> {
    return this.httpClient.post<Event>(this.prepareUrl(), { title, start, end, description, Type, customer });
  }
}
