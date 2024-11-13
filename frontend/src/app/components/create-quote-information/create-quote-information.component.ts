import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-create-quote-information',
  standalone: true,
  imports: [InputTextareaModule],
  templateUrl: './create-quote-information.component.html',
  styleUrl: './create-quote-information.component.css'
})
export class CreateQuoteInformationComponent {
  @Input() form: FormGroup = new FormGroup({});
}
