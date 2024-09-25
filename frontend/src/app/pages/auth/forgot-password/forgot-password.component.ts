import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { ForgotPasswordInterface } from '../../../class/user';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [LoaderComponent, ReactiveFormsModule, MatIconModule, ButtonComponent, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  public isLoading: boolean = false;

  constructor(private toastr: ToastrService, private authService: AuthService) { }

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  get email() { return this.forgotPasswordForm.get('email') || new FormControl(); }

  onSubmit() {
    this.isLoading = true;
    const formValue = this.forgotPasswordForm.value;
    const userData: ForgotPasswordInterface = {
      email: formValue.email || ''
    };
    this.authService.forgotPassword(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastr.success('Un email vous a été envoyé.');
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.error.message);
      }
    });
  }
}
