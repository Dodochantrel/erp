import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormButtonsComponent } from '../../components/form-buttons/form-buttons.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { UploadFileComponent } from '../../components/upload-file/upload-file.component';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    NavigationComponent,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormButtonsComponent,
    ReactiveFormsModule,
    InputMaskModule,
    UploadFileComponent,
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css',
})
export class InformationComponent {
  constructor(
    private formBuilder: FormBuilder
  ) {}

  public informationForm = this.formBuilder.group({
    companyName: ['', Validators.required],
    siret: ['', Validators.required],
    firstName: [null],
    lastName: [null],
    email: [null],
    phoneNumber: [null],
    address: [null],
    city: [null],
    zipCode: [null],
    logo: [null],
  });

  cancel() {
    console.log('cancel');
  }

  save() {
    console.log('save');
    console.log(this.informationForm.value);
  }
}
