import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Customer } from '../../class/customer';
import { Column, TableService } from '../../services/table.service';
import { NotificationService } from '../../services/notification.service';
import { CustomerService } from '../../services/customer.service';
import { ButtonComponent } from '../../components/button/button.component';
import { AddCustomerComponent } from '../../components/add-customer/add-customer.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { Meta } from '../../class/meta';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { EditCustomerComponent } from '../../components/edit-customer/edit-customer.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonComponent,
    AddCustomerComponent,
    PaginationComponent,
    LoaderComponent,
    MatIconModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    EditCustomerComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  public customers: Customer[] = [];
  public colums: Column[] = [];
  public meta: Meta = {} as Meta;
  public isLoading: boolean = false;
  public selectedUser: Customer | null = null;
  public searchControl: FormControl = new FormControl();

  constructor(
    private readonly tableService: TableService,
    private readonly notificationService: NotificationService,
    readonly customerService: CustomerService
  ) {
    this.colums = this.tableService.getCutomersColumns();
  }

  ngOnInit(): void {
    this.getCustomers();
    this.search();    
  }

  search() {
    // Écouter les changements de valeur de l'input de recherche
    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe((searchTerm: string) => {
      if (searchTerm === '') {
        this.getCustomers(null);
      } else {
        this.getCustomers(searchTerm);
      }
    });
  }

  getCustomers(search: string | null = null): void {
    this.isLoading = true;
    this.customerService
      .getCustomers(this.meta.page, this.meta.limit, search)
      .subscribe({
        next: (response) => {
          this.meta = response.meta;
          this.customers = response.data;
        },
        error: (error) => {
          this.notificationService.show(
            'Erreur lors de la récupération des clients',
            'error'
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  handleAddCustomer(): void {
    this.customerService.handleIsAddCustomer();
  }

  addNewCustomer(customer: Customer): void {
    this.customers.push(customer);
    this.notificationService.show('Client ajouté avec succès', 'success');
  }

  updateCustomer(customer: Customer): void {
    const index = this.customers.findIndex((c) => c.id === customer.id);
    this.customers[index] = customer;
    this.notificationService.show('Client modifié avec succès', 'success');
  }

  onChangeMeta(meta: any): void {
    this.meta = meta;
    this.getCustomers();
  }

  handleEditCustomer(customer: Customer): void {
    this.selectedUser = customer;
    this.customerService.handleIsEditCustomer();
  }

  deleteCustomer(customer: Customer): void {
    this.customerService.delete(customer.id).subscribe({
      next: () => {
        this.customers = this.customers.filter((c) => c.id !== customer.id);
        this.notificationService.show('Client supprimé avec succès', 'success');
      },
      error: (error) => {
        this.notificationService.show(
          'Erreur lors de la suppression du client',
          'error'
        );
      },
    });
  }

  prepareName(customer: Customer): string {
    return customer.isCompany ? customer.companyName! : `${customer.lastName!.toUpperCase()} ${customer.firstName}`;
  }
}
