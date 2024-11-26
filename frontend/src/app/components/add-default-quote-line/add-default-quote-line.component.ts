import { Component, EventEmitter, Output } from '@angular/core';
import { DefaultQuoteLine } from '../../class/default-quote-line';

@Component({
  selector: 'app-add-default-quote-line',
  standalone: true,
  imports: [],
  templateUrl: './add-default-quote-line.component.html',
  styleUrl: './add-default-quote-line.component.css'
})
export class AddDefaultQuoteLineComponent {
  @Output() newDefaultQuoteLine = new EventEmitter<DefaultQuoteLine>();

}
