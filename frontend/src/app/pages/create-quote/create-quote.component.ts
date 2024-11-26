import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { User } from '../../class/user';
import { FileService } from '../../services/file.service';
import { CreateQuoteTableComponent } from '../../components/create-quote-table/create-quote-table.component';
import { CreateQuotePriceComponent } from '../../components/create-quote-price/create-quote-price.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateQuoteInformationComponent } from '../../components/create-quote-information/create-quote-information.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DropdownModule } from 'primeng/dropdown';
import { Customer } from '../../class/customer';
import { CustomerService } from '../../services/customer.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quote',
  standalone: true,
  imports: [
    CreateQuoteTableComponent,
    FloatLabelModule,
    CreateQuotePriceComponent,
    ReactiveFormsModule,
    CreateQuoteInformationComponent,
    ButtonComponent,
    DropdownModule,
    AutoCompleteModule,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.css',
})
export class CreateQuoteComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly router: Router
  ) {}

  public user: User = new User();
  public isLoading: boolean = false;

  public selectedCustomer: Customer | null = null;
  public customerNames: CustomerName[] = [];
  public filteredCustomerNamesSaved: CustomerName[] = [];

  public quoteForm = this.formBuilder.group({
    companyName: ['', Validators.required],
    companyAddress: ['', Validators.required],
    companyCity: ['', Validators.required],
    companyZipCode: [0, Validators.required],
    companySiret: [''],
    companyPhone: [''],
    customerName: ['', Validators.required],
    customerAddress: ['', Validators.required],
    customerCity: ['', Validators.required],
    customerZipCode: ['', Validators.required],
    customerSiret: [''],
    customerPhone: [''],
    moreInformation: [''],
  });

  ngOnInit(): void {
    this.getInformations();
    this.getCustomers();
  }

  getInformations() {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.prepareForm();
      },
      error: () => {
        this.notificationService.show('Une erreur est survenue', 'error');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getCustomers() {
    this.customerService.getCustomersNames().subscribe({
      next: (customers) => {
        this.customerNames = customers.map((customer) => {
          return { id: customer.id, name: customer.prepareName() };
        });
        this.filterCustomer();
      },
      error: () => {
        this.notificationService.show('Une erreur est survenue', 'error');
      },
    });
  }

  decodeFile(file: string | null): string | null {
    if (file) {
      return this.fileService.decodeFile(file);
    } else {
      return null;
    }
  }

  prepareForm() {
    this.quoteForm.controls['companyName'].setValue(
      this.user.company?.name ?? ''
    );
    this.quoteForm.controls['companyAddress'].setValue(
      this.user.company?.address ?? ''
    );
    this.quoteForm.controls['companyCity'].setValue(
      this.user.company?.city ?? ''
    );
    this.quoteForm.controls['companyZipCode'].setValue(
      this.user.company?.zipCode ?? 0
    );
    this.quoteForm.controls['companySiret'].setValue(
      this.user.company?.siret ?? ''
    );
    this.quoteForm.controls['companyPhone'].setValue(this.user.phone ?? '');
  }

  save() {
    console.log(this.quoteForm.value);
  }

  // Ecouter les changement de valeur de selectedCustomer
  onCustomerSelected(event: any) {
    this.customerService.getOne(this.selectedCustomer!.id).subscribe({
      next: (customer) => {
        this.quoteForm.controls['customerName'].setValue(customer.prepareName());
        this.quoteForm.controls['customerAddress'].setValue(customer.address);
        this.quoteForm.controls['customerCity'].setValue(customer.city);
        this.quoteForm.controls['customerZipCode'].setValue(customer.zipCode);
        this.quoteForm.controls['customerSiret'].setValue(customer.siret);
        this.quoteForm.controls['customerPhone'].setValue(customer.phoneNumber);
      },
      error: () => {
        this.notificationService.show('Une erreur est survenue', 'error');
      },
    })
  }

  filterCustomer(event: AutoCompleteCompleteEvent | null = null) {
    let filtered: CustomerName[] = [];
    let query = event ? event.query : '';

    if(query === '') {
      this.filteredCustomerNamesSaved = this.customerNames;
    } else {
      for (let i = 0; i < (this.customerNames as CustomerName[]).length; i++) {
        let country = (this.customerNames as CustomerName[])[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            filtered.push(country);
        }
      }

      this.filteredCustomerNamesSaved = filtered;
    }
  }

  redirectEditQuoteLine() {
    this.router.navigate(['/edit-quote-line']);
  }
}

export interface CustomerName {
  id: number;
  name: string;
}
