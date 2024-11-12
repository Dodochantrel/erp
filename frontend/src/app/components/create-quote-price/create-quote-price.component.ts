import { Component } from '@angular/core';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-create-quote-price',
  standalone: true,
  imports: [],
  templateUrl: './create-quote-price.component.html',
  styleUrl: './create-quote-price.component.css'
})
export class CreateQuotePriceComponent {
  constructor(readonly quoteService: QuoteService) {}
}
