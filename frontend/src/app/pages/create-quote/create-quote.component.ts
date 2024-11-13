import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { User } from '../../class/user';
import { FileService } from '../../services/file.service';
import { CreateQuoteTableComponent } from '../../components/create-quote-table/create-quote-table.component';
import { CreateQuotePriceComponent } from '../../components/create-quote-price/create-quote-price.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateQuoteInformationComponent } from '../../components/create-quote-information/create-quote-information.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-create-quote',
  standalone: true,
  imports: [CreateQuoteTableComponent, CreateQuotePriceComponent, ReactiveFormsModule, CreateQuoteInformationComponent, ButtonComponent],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.css',
})
export class CreateQuoteComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private formBuilder: FormBuilder
  ) {}

  public user: User = new User();
  public isLoading: boolean = false;

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

  decodeFile(file: string | null): string | null {
    if(file){
      return this.fileService.decodeFile(file);
    } else {
      return null;
    } 
  }

  prepareForm() {
    this.quoteForm.controls['companyName'].setValue(this.user.company?.name ?? '');
    this.quoteForm.controls['companyAddress'].setValue(this.user.company?.address ?? '');
    this.quoteForm.controls['companyCity'].setValue(this.user.company?.city ?? '');
    this.quoteForm.controls['companyZipCode'].setValue(this.user.company?.zipCode ?? 0);
    this.quoteForm.controls['companySiret'].setValue(this.user.company?.siret ?? '');
    this.quoteForm.controls['companyPhone'].setValue(this.user.phone ?? '');
  }

  save() {
    console.log(this.quoteForm.value);
  }
}
