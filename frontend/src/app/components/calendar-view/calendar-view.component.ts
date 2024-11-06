import { Component } from '@angular/core';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import {
  CalendarEvent,
  CalendarView,
  CalendarModule,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear'; 
import { NotificationService } from '../../services/notification.service';
import { EventService } from '../../services/event.service';
import { addMonths, subMonths } from 'date-fns';
import { ButtonComponent } from '../button/button.component';
import { Event } from '../../class/event';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule as PrimeCalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CookieService } from '../../services/cookie.service';

const SECOND_COLOR_FOR_EVENT = '#D7D7D7';

dayjs.extend(weekOfYear); 

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CalendarModule, ButtonComponent, TabViewModule, PrimeCalendarModule, FormsModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarViewComponent {
  public view: CalendarView = CalendarView.Month;
  public viewDate: Date = new Date();

  public events: CalendarEvent[] = [];

  // Configuration du calendrier
  public locale: string = 'fr';
  public weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  public weekendDays: number[] = [DAYS_OF_WEEK.SUNDAY];
  public isOpenAddEvent: boolean = false;
  public weekNumber: number = 0;
  public clickedDate: Date | null = null;

  public startHour: Date = new Date(new Date().setHours(7, 0, 0, 0));
  public endHour: Date = new Date(new Date().setHours(19, 0, 0, 0));
  public startHourNumber: number = 7;
  public endHourNumber: number = 19;

  constructor(
    readonly eventService: EventService,
    private readonly notificationService: NotificationService,
    private readonly cookieService: CookieService
  ) {}

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  ngOnInit() {
    this.getEvents();
    this.calculateWeekNumber();
    this.getOpenHour();
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
        primary: SECOND_COLOR_FOR_EVENT,
        secondary: SECOND_COLOR_FOR_EVENT,
      },
    };
  }

  addEvent(event: Event) {
    this.events.push(this.mapFromEventToCalendarEvent(event));
  }

  calculateWeekNumber() {
    this.weekNumber = dayjs(this.viewDate).week();
  }

  goToToday() {
    this.viewDate = new Date();
  }

  changeHours() {
    this.startHourNumber = this.startHour.getHours();
    this.endHourNumber = this.endHour.getHours();
    this.cookieService.setCookie('startHour', this.startHourNumber.toString());
    this.cookieService.setCookie('endHour', this.endHourNumber.toString());
  }

  getOpenHour() {
    this.startHourNumber = +this.cookieService.getCookie('startHour');
    this.endHourNumber = +this.cookieService.getCookie('endHour');
    this.startHour = new Date(new Date().setHours(this.startHourNumber, 0, 0, 0));
    this.endHour = new Date(new Date().setHours(this.endHourNumber, 0, 0, 0));
  }
}
