import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { QuoteLine } from "../class/quote-line";

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private readonly httpClient: HttpClient) {}

  public quoteLines: QuoteLine[] = [];
  public totalQuotePrice: number = 0;
  public totalPriceQuoteWithoutTaxes: number = 0;
  public totalTaxesQuote: number = 0;

  public calculateTotalQuotePrice(): void {
    this.totalQuotePrice = 0;
  
    this.quoteLines.forEach((quoteLine) => {
      this.totalQuotePrice += +quoteLine.price * +quoteLine.quantity;
    });
  
    this.totalQuotePrice = parseFloat(this.totalQuotePrice.toFixed(2));
    this.totalPriceQuoteWithoutTaxes = parseFloat((this.totalQuotePrice * 0.8).toFixed(2));
    this.totalTaxesQuote = parseFloat((this.totalQuotePrice * 0.2).toFixed(2));
  }
}
