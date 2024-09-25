import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { RegisterInterface } from '../../../class/user';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CommonModule, ButtonComponent, LoaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private toastr: ToastrService, private authService: AuthService) { }

  public passwordVisibility: boolean = false;
  public passwordConfirmVisibility: boolean = false;
  public isLoading: boolean = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),  
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),  
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
    ]),
  });

  get firstName() { return this.registerForm.get('firstName') || new FormControl(); }

  get lastName() { return this.registerForm.get('lastName') || new FormControl(); }

  get email() { return this.registerForm.get('email') || new FormControl(); }

  get password() { return this.registerForm.get('password') || new FormControl(); }

  get passwordConfirm() { return this.registerForm.get('passwordConfirm') || new FormControl(); }

  handlerPassword() {
    this.passwordVisibility = !this.passwordVisibility;
    const passwordElement = document.getElementById('password');
    if (passwordElement) {
        const newType = this.passwordVisibility ? 'text' : 'password';
        passwordElement.setAttribute('type', newType);
    }
  }

  handlerPasswordConfirm() {
    this.passwordConfirmVisibility = !this.passwordConfirmVisibility;
    const passwordElement = document.getElementById('passwordConfirm');
    if (passwordElement) {
        const newType = this.passwordConfirmVisibility ? 'text' : 'password';
        passwordElement.setAttribute('type', newType);
    }
  }

  onSubmit() {
    this.isLoading = true;
    if (this.password.value !== this.passwordConfirm.value) {
      this.toastr.error('Les mots de passe ne correspondent pas');
      this.isLoading = false;
      return;
    }
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const userData: RegisterInterface = {
        firstName: formValue.firstName || '',
        lastName: formValue.lastName || '',
        email: formValue.email || '',
        password: formValue.password || ''
      };
      this.authService.register(userData).subscribe({
        next: data => {
          this.isLoading = false;
          this.toastr.success('Votre compte est bien créer, allez dans votre boite mail pour valider votre compte');
        },
        error: error => {
          this.isLoading = false;
          this.toastr.error(error.error.message);
        }
      });
    } else {
      this.isLoading = false;
      this.toastr.error('Form is not valid');
    }
  } 

}