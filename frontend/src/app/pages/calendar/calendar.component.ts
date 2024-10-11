import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  CalendarEvent,
  CalendarView,
  CalendarModule,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { addMonths, subMonths } from 'date-fns';
import { Event } from '../../class/event';
import dayjs from 'dayjs';

const SECOND_COLOR_FOR_EVENT = '#D7D7D7';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NavigationComponent, ButtonComponent, CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  // Configuration du calendrier
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  public isOpenAddEvent: boolean = false;

  constructor(
    private readonly eventService: EventService,
    private readonly notificationService: NotificationService
  ) {}

  public handlerIsOneAddEvent() {
    this.isOpenAddEvent = !this.isOpenAddEvent;
  }

  // Méthode pour passer au mois suivant
  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  // Méthode pour revenir au mois précédent
  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    const start = dayjs().startOf('year');
    const end = dayjs().endOf('year');
    this.eventService.findAll(start, end).subscribe({
      next: (events) => {
        this.events = this.prepareFromEventToCalendarEvent(events);
      },
      error: (error) => {
        this.notificationService.show(
          'Erreur lors de la récupération des événements',
          'error'
        );
      },
    });
  }

  prepareFromEventToCalendarEvent(events: Event[]): CalendarEvent[] {
    const calendarEvents: CalendarEvent[] = [];
    events.forEach((event) => {
      calendarEvents.push(this.mapFromEventToCalendarEvent(event));
    });
    return calendarEvents;
  }

  mapFromEventToCalendarEvent(event: Event): CalendarEvent {
    return {
      start: new Date(event.start.toString()),
      end: new Date(event.end.toString()),
      title: event.title,
      color: {
        primary: event.color ? event.color : SECOND_COLOR_FOR_EVENT,
        secondary: SECOND_COLOR_FOR_EVENT,
      },
    };
  }

  addEvent(event: Event) {
    this.events.push(this.mapFromEventToCalendarEvent(event));
  }
}
