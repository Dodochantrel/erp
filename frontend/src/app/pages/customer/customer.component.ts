import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Customer } from '../../class/customer';
import { Column, TableService } from '../../services/table.service';
import { error } from 'console';
import { NotificationService } from '../../services/notification.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [NavigationComponent, TableModule, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  public cutomers: Customer[] = [];
  public colums: Column[] = [];

  constructor(
    private readonly tableService: TableService,
    private readonly notificationService: NotificationService,
    private readonly customerService: CustomerService
  ) {
    this.colums = this.tableService.getCutomersColumns();
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (cutomers) => {
        this.cutomers = cutomers;
        console.log(cutomers);
      },
      error: (error) => {
        this.notificationService.show('Erreur lors de la récupération des clients', 'error');
      },
    });
  }
}
