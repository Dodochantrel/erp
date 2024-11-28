import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuoteLine } from '../class/quote-line';
import {
  DefaultQuoteLineDto,
  defaultQuoteLineDtoToQuoteLine,
  defaultQuoteLinesDtoToQuoteLines,
  defaultQuoteLinesDtoToQuoteLinesWithPagination,
} from '../dto/default-quote-line.dto';
import { map, Observable } from 'rxjs';
import { api } from '../environments/environment';
import { DefaultQuoteLine } from '../class/default-quote-line';
import { PaginatedResponse } from '../class/pagniated-response';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private readonly httpClient: HttpClient) {}

  public quoteLines: QuoteLine[] = [];
  public totalQuotePrice: number = 0;
  public totalPriceQuoteWithoutTaxes: number = 0;
  public totalTaxesQuote: number = 0;
  public isAddDefaultQuoteLine: boolean = false;

  public calculateTotalQuotePrice(): void {
    this.totalQuotePrice = 0;

    this.quoteLines.forEach((quoteLine) => {
      this.totalQuotePrice += +quoteLine.price * +quoteLine.quantity;
    });

    this.totalQuotePrice = parseFloat(this.totalQuotePrice.toFixed(2));
    this.totalPriceQuoteWithoutTaxes = parseFloat(
      (this.totalQuotePrice * 0.8).toFixed(2)
    );
    this.totalTaxesQuote = parseFloat((this.totalQuotePrice * 0.2).toFixed(2));
  }

  public getDefaultQuoteLines(
    page: number = 1,
    limit: number = 10,
    search: string | null = null
  ): Observable<PaginatedResponse<DefaultQuoteLine>> {
    return this.httpClient
      .get<PaginatedResponse<DefaultQuoteLineDto>>(`${api.url}/quote/default-quote-lines/search/${search}?page=${page}&limit=${limit}`)
      .pipe(map(defaultQuoteLinesDtoToQuoteLinesWithPagination));
  }

  public handleIsAddDefaultQuoteLine(): void {
    this.isAddDefaultQuoteLine = !this.isAddDefaultQuoteLine;
  }

  public saveNewDefaultQuoteLine(
    description: string,
    unitPrice: number
  ): Observable<DefaultQuoteLine> {
    return this.httpClient
      .post<DefaultQuoteLineDto>(`${api.url}/quote/default-quote-lines`, {
        description,
        unitPrice,
      })
      .pipe(map(defaultQuoteLineDtoToQuoteLine));
  }
}
