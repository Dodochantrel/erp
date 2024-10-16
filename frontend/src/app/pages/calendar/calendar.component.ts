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
import weekOfYear from 'dayjs/plugin/weekOfYear'; // Importer le plugin
import { CalendarModule as PrimeCalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventComponent } from '../../components/add-event/add-event.component';

const SECOND_COLOR_FOR_EVENT = '#D7D7D7';

dayjs.extend(weekOfYear); // Activer le plugin

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NavigationComponent,
    ButtonComponent,
    CalendarModule,
    PrimeCalendarModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    ReactiveFormsModule,
    AddEventComponent,
  ],
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
  public searchControl: FormControl = new FormControl();
  public dateControl: FormControl = new FormControl();

  events: CalendarEvent[] = [];

  // Configuration du calendrier
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  public isOpenAddEvent: boolean = false;
  public weekNumber: number = 0;

  constructor(
    readonly eventService: EventService,
    private readonly notificationService: NotificationService
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
}
