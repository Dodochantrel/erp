import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormButtonsComponent } from '../form-buttons/form-buttons.component';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../class/customer';
import { NotificationService } from '../../services/notification.service';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormButtonsComponent,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, readonly customerService: CustomerService, readonly notificationService: NotificationService) {}

  @Output() newCustomer = new EventEmitter<Customer>();

  public optionsCustomer: any[] = [{ label: 'Particuler', value: false },{ label: 'Entreprise', value: true }];

  public customerForm = this.formBuilder.group({
    isCompany: [false, Validators.required],
    siret: [null],
    companyName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [null],
    phoneNumber: [null],
    address: [null],
    city: [null],
    zipCode: [null],
    country: [null],
  });

  ngOnInit(): void {
    this.subscribeIsCompany();
  }

  save(): void {
    if(this.customerForm.valid) {
      this.customerService.save(
        this.customerForm.value.isCompany!,
        this.customerForm.value.siret!,
        this.customerForm.value.companyName!,
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
          this.notificationService.show('Une erreur est survenue', 'error');
        },
      });
    } else {
      this.updateFailedInputs();
      this.notificationService.show('Mercide remplir les champs obligatoires', 'error');
    }
  }

  subscribeIsCompany(): void {
    this.customerForm.get('isCompany')?.valueChanges.subscribe((value: boolean | null) => {
      if(value && value === true) {
        this.customerForm.get('firstName')?.clearValidators();
        this.customerForm.get('lastName')?.clearValidators();
        this.customerForm.get('companyName')?.setValidators([Validators.required]);
      } else {
        this.customerForm.get('firstName')?.setValidators([Validators.required]);
        this.customerForm.get('lastName')?.setValidators([Validators.required]);
        this.customerForm.get('companyName')?.clearValidators();
      }
    });
  }

  updateFailedInputs() {
    Object.keys(this.customerForm.controls).forEach(field => {
      const control = this.customerForm.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty({ onlySelf: true });
    });
  }

}

