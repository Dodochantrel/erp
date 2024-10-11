import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormButtonsComponent } from '../form-buttons/form-buttons.component';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../class/customer';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormButtonsComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  constructor(private formBuilder: FormBuilder, readonly customerService: CustomerService) {}

  @Output() newCustomer = new EventEmitter<Customer>();

  public customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [null],
    phoneNumber: [null],
    address: [null],
    city: [null],
    zipCode: [null],
    country: [null],
  });

  save(): void {
    this.customerService.save(
      this.customerForm.value.firstName!,
      this.customerForm.value.lastName!,
      this.customerForm.value.email!,
      this.customerForm.value.phoneNumber!,
      this.customerForm.value.address!,
      this.customerForm.value.city!,
      this.customerForm.value.zipCode!,
      this.customerForm.value.country!
    ).subscribe({
      next: (data) => {
        this.newCustomer.emit(data);
        this.customerForm.reset();
        this.customerService.handleIsAddCustomer();
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    })
  }
}
