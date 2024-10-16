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
  ) {}

  @Output() newEvent = new EventEmitter<Event>();

  public types: TypeEvent[] = [];

  public eventForm = this.formBuilder.group({
    title: ['', Validators.required],
    startDate: [null, Validators.required],
    startHour: [null],
    endDate: [null, Validators.required],
    endHour: [null],
    description: [null],
    type: [null, Validators.required],
  });

  ngOnInit() {
    this.findAllType();
  }

  prepareDateTime(date: Date, hour: Date | null | undefined): Dayjs {
    const dateFormatted = dayjs(date);
    const hourFormatted = hour ? dayjs(hour) : dayjs('00:00', 'HH:mm');
    return dateFormatted.hour(hourFormatted.hour()).minute(hourFormatted.minute());
  }

  save() {
    if(this.eventForm.valid) {
      this.eventService
      .create(
        this.eventForm.value.title!,
        this.prepareDateTime(this.eventForm.value.startDate!, this.eventForm.value.startHour),
        this.prepareDateTime(this.eventForm.value.endDate!, this.eventForm.value.endHour),
        this.eventForm.value.type!,
        this.eventForm.value.description!,
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
