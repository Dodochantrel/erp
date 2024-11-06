import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Event, TypeEvent } from '../../class/event';
import { EventService } from '../../services/event.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormButtonsComponent } from '../form-buttons/form-buttons.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../services/notification.service';
import dayjs, { Dayjs } from 'dayjs';
import { Customer } from '../../class/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormButtonsComponent,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextareaModule,
    DropdownModule,
    ButtonComponent,
    MatIconModule,
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css',
})
export class AddEventComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    readonly eventService: EventService,
    private readonly ntificationService: NotificationService,
    private readonly customerService: CustomerService,
  ) {}

  @Output() newEvent = new EventEmitter<Event>();

  public types: TypeEvent[] = [];
  public customers: Customer[] = [];

  public eventForm = this.formBuilder.group({
    title: ['', Validators.required],
    startDate: [null, Validators.required],
    startHour: [null],
    endDate: [null, Validators.required],
    endHour: [null],
    description: [null],
    type: [null, Validators.required],
    customer: [null],
  });

  ngOnInit() {
    this.findAllType();
    this.findCustomers();
  }

  findCustomers() {
    this.customerService.getCustomersNames().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => {
        this.ntificationService.show('Erreur lors de la récupération des clients', 'error');
      },
    });
  }

  prepareDateTime(date: Date, hour: Date | null): Dayjs {
    const dateFormatted = dayjs(date);
    const hourFormatted = hour ? dayjs(hour) : dayjs().set('hour', 0).set('minute', 0);
    return dateFormatted.hour(hourFormatted.hour()).minute(hourFormatted.minute());
  }

  save() {
    if(this.eventForm.valid) {
      this.eventService
      .create(
        this.eventForm.value.title!,
        this.prepareDateTime(this.eventForm.value.startDate!, this.eventForm.value.startHour === undefined ? null : this.eventForm.value.startHour),
        this.prepareDateTime(this.eventForm.value.endDate!, this.eventForm.value.endHour === undefined ? null : this.eventForm.value.endHour),
        this.eventForm.value.type!,
        this.eventForm.value.description!,
        this.eventForm.value.customer!,
      )
      .subscribe({
        next: (data) => {
          this.newEvent.emit(data);
          this.eventForm.reset();
          this.eventService.handleIsAddEvent();
          this.ntificationService.show('Évènement bien ajouté', 'success');
        },
        error: (error) => {
          this.ntificationService.show('Erreur lors de l\'ajout de l\'évènement', 'error');
        },
      });
    } else {
      this.ntificationService.show('Veuillez remplir tous les champs', 'error');
    }
  }

  findAllType() {
    this.eventService.findAllType().subscribe({
      next: (data) => {
        this.types = data;
      },
      error: (error) => {
        this.ntificationService.show('Erreur lors de la récupération des catégories', 'error');
      },
    });
  }
}
