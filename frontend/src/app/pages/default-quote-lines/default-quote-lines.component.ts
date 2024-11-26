import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../../components/button/button.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta } from '../../class/meta';
import { DefaultQuoteLine } from '../../class/default-quote-line';
import { QuoteService } from '../../services/quote.service';
import { NotificationService } from '../../services/notification.service';
import { AddDefaultQuoteLineComponent } from '../../components/add-default-quote-line/add-default-quote-line.component';

@Component({
  selector: 'app-edit-quote-lines',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonComponent,
    PaginationComponent,
    LoaderComponent,
    MatIconModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    AddDefaultQuoteLineComponent,
  ],
  templateUrl: './default-quote-lines.component.html',
  styleUrl: './default-quote-lines.component.css'
})
export class DefaultQuoteLinesComponent implements OnInit {
  constructor(readonly quoteService: QuoteService, private readonly notificationService: NotificationService) {}

  public defaultQuoteLines: DefaultQuoteLine[] = [];
  public isLoading: boolean = false;
  public meta: Meta = {} as Meta;
  public isAddDefaultQuoteLine: boolean = false;

  ngOnInit(): void {
    this.getDefaultQuoteLines(this.meta.page, this.meta.limit);
  }

  onChangeMeta(meta: any): void {
    this.meta = meta;
    this.getDefaultQuoteLines(this.meta.page, this.meta.limit);
  }

  getDefaultQuoteLines(page: number, limit: number): void {
    this.isLoading = true;
    this.quoteService.getDefaultQuoteLines(page, limit).subscribe({
      next: (defaultQuoteLines) => {
        this.defaultQuoteLines = defaultQuoteLines;
      },
      error: (error) => {
        this.notificationService.show('Erreur lors de la récupération des lignes de devis', 'error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  handleAddDefaultQuoteLine(): void {
    this.isAddDefaultQuoteLine = !this.isAddDefaultQuoteLine;
  }

  addNewDefaultQuoteLine(defaultQuoteLine: DefaultQuoteLine): void {
    this.defaultQuoteLines.push(defaultQuoteLine);
  }
}
