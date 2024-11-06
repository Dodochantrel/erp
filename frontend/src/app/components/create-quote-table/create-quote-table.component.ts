import { Component } from '@angular/core';
import { QuoteLine } from '../../class/quote-line';

@Component({
  selector: 'app-create-quote-table',
  standalone: true,
  imports: [],
  templateUrl: './create-quote-table.component.html',
  styleUrl: './create-quote-table.component.css'
})
export class CreateQuoteTableComponent {
  constructor() { }

  public quoteLines: QuoteLine[] = [];
}
