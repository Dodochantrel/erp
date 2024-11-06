import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { ButtonComponent } from '../../components/button/button.component';
import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';
import { CalendarModule as PrimeCalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventComponent } from '../../components/add-event/add-event.component';
import { CalendarViewComponent } from '../../components/calendar-view/calendar-view.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NavigationComponent,
    ButtonComponent,
    PrimeCalendarModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    ReactiveFormsModule,
    AddEventComponent,
    CalendarViewComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  public searchControl: FormControl = new FormControl();
  public dateControl: FormControl = new FormControl();

  constructor(
    readonly eventService: EventService,
    private readonly notificationService: NotificationService
  ) {}
}
