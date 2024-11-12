import { Component } from '@angular/core';
import { QuoteLine } from '../../class/quote-line';
import { FormsModule } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';

@Component({
  selector: 'app-create-quote-table',
  standalone: true,
  imports: [FormsModule, AutoCompleteModule],
  templateUrl: './create-quote-table.component.html',
  styleUrl: './create-quote-table.component.css',
})
export class CreateQuoteTableComponent {
  constructor(readonly quoteService: QuoteService) {}

  public quoteLinesSaved: QuoteLine[] = [];
  public filteredQuoteLinesSaved: any[] = [];

  public addQuoteLine() {
    const quoteLine = new QuoteLine();
    quoteLine.id = this.quoteService.quoteLines.length + 1;
    this.quoteService.quoteLines.push(quoteLine);
  }

  public removeQuoteLine(quoteLine: QuoteLine) {
    this.quoteService.quoteLines = this.quoteService.quoteLines.filter(
      (line) => line.id !== quoteLine.id
    );
  }

  public changePrice(): void {
    this.quoteService.calculateTotalQuotePrice();
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.quoteLinesSaved as any[]).length; i++) {
      let country = (this.quoteLinesSaved as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredQuoteLinesSaved = filtered;
  }
}
