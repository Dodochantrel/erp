import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Customer } from '../../class/customer';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormButtonsComponent } from '../form-buttons/form-buttons.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    FormButtonsComponent,
  ],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css',
})
export class EditCustomerComponent implements OnChanges {
  @Input() customer: Customer | null = null;
  @Output() updatedCustomer = new EventEmitter<Customer>();

  constructor(
    private formBuilder: FormBuilder,
    readonly customerService: CustomerService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && this.customer) {
      this.updateForm();
    }
  }

  public customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [this.customer?.email],
    phoneNumber: [this.customer?.phoneNumber],
    address: [this.customer?.address],
    city: [this.customer?.city],
    zipCode: [this.customer?.zipCode],
    country: [this.customer?.country],
  });

  updateForm(): void {
    if (this.customer) {
      this.customerForm.setValue({
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email,
        phoneNumber: this.customer.phoneNumber,
        address: this.customer.address,
        city: this.customer.city,
        zipCode: this.customer.zipCode,
        country: this.customer.country,
      });
    }
  }

  save(): void {
    if (!this.customer) {
      this.notificationService.show('Aucun client sélectionné', 'error');
      return;
    }
    this.customerService.patch(this.buildCustomer()).subscribe({
      next: (data) => {
        this.customer = data;
        this.customerService.handleIsEditCustomer();
        this.updatedCustomer.emit(data);
      },
      error: (error) => {
        this.notificationService.show('Erreur lors de la modification', 'error');
      },
    });
  }

  buildCustomer(): Customer {
    const customer = new Customer(
      this.customer!.id,
      this.customerForm.value.firstName!,
      this.customerForm.value.lastName!,
    );
    customer.email = this.customerForm.value.email || null;
    customer.phoneNumber = this.customerForm.value.phoneNumber || null;
    customer.address = this.customerForm.value.address || null;
    customer.city = this.customerForm.value.city || null;
    customer.zipCode = this.customerForm.value.zipCode || null;
    customer.country = this.customerForm.value.country || null;
    return customer;
  }
}
