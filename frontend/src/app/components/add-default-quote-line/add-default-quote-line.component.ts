import { Component, EventEmitter, Output } from '@angular/core';
import { DefaultQuoteLine } from '../../class/default-quote-line';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { QuoteService } from '../../services/quote.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormButtonsComponent } from '../form-buttons/form-buttons.component';

@Component({
  selector: 'app-add-default-quote-line',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormButtonsComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-default-quote-line.component.html',
  styleUrl: './add-default-quote-line.component.css',
})
export class AddDefaultQuoteLineComponent {
  constructor(
    private formBuilder: FormBuilder,
    readonly notificationService: NotificationService,
    readonly quoteService: QuoteService
  ) {}
  @Output() newDefaultQuoteLine = new EventEmitter<DefaultQuoteLine>();

  public form = this.formBuilder.group({
    description: [null, Validators.required],
    price: [null, Validators.required],
  });

  save(): void {
    if (this.form.valid) {
      this.quoteService
        .saveNewDefaultQuoteLine(
          this.form.value.description!,
          this.form.value.price!
        )
        .subscribe({
          next: (data) => {
            this.newDefaultQuoteLine.emit(data);
            this.form.reset();
            this.quoteService.handleIsAddDefaultQuoteLine();
          },
          error: (error) => {
            this.notificationService.show('Une erreur est survenue', 'error');
          },
        });
    } else {
      this.updateFailedInputs();
      this.notificationService.show(
        'Merci de remplir les champs obligatoires',
        'error'
      );
    }
  }

  updateFailedInputs() {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty({ onlySelf: true });
    });
  }
}
