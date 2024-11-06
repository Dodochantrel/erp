import { Component, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormButtonsComponent } from '../../components/form-buttons/form-buttons.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { UploadFileComponent } from '../../components/upload-file/upload-file.component';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { User } from '../../class/user';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormButtonsComponent,
    ReactiveFormsModule,
    InputMaskModule,
    UploadFileComponent,
    CommonModule,
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css',
})
export class InformationComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {}

  public previousUserValues: User = new User();

  ngOnInit() {
    this.getInformation();
  }

  getInformation() {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.buildForm(user);
        this.previousUserValues = user;
      },
      error: () => {
        this.notificationService.show('Une erreur est survenue', 'error');
      },
    });
  }

  public informationForm = this.formBuilder.group({
    firstName: [null as string | null, Validators.required],
    lastName: [null as string | null, Validators.required],
    companyName: [null as string | null],
    siret: [null as string | null],
    email: [null as string | null],
    phoneNumber: [null as number | null],
    address: [null as string | null],
    city: [null as string | null],
    zipCode: [null as number | null],
    logo: [null as string | null],
  });
  
  buildForm(user: User) {
    this.informationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.company?.name || null,
      siret: user.company?.siret || null,
      email: user.email || null,
      phoneNumber: user.phone || null,
      address: user.company?.address || null,
      city: user.company?.city || null,
      zipCode: user.company?.postalCode || null,
      logo: user.company?.logoEncodedBase64 || null,
    });
  }

  cancel() {
    this.buildForm(this.previousUserValues);
  }

  save() {
    if(this.informationForm.invalid) {
      this.notificationService.show('Merci de remplir tout les champs obligatoire', 'error');
    } else {
      this.userService.patchUser(
        this.informationForm.value.companyName!,
        this.informationForm.value.siret!,
        this.informationForm.value.firstName!,
        this.informationForm.value.lastName!,
        this.informationForm.value.email!,
        this.informationForm.value.phoneNumber!,
        this.informationForm.value.address!,
        this.informationForm.value.city!,
        this.informationForm.value.logo!,
        this.informationForm.value.zipCode!,
      ).subscribe({
        next: () => {
          this.notificationService.show('Information bien mise a jour', 'success');
        },
        error: () => {
          this.notificationService.show('Une erreur est survenue', 'error');
        },
      });
    }
  }
}
