import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { Meta } from '../../class/meta';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() meta: Meta = {} as Meta;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20, 50, 100];
  @Output() onChange: EventEmitter<Meta> = new EventEmitter<Meta>();

  constructor() {}

  onValueChange(event: any): void {
    const meta = this.meta;
    meta.page = event.page + 1;
    meta.limit = event.rows;
    this.onChange.emit(meta);
  }
}
