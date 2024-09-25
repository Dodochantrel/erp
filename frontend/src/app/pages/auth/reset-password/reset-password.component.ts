import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../../services/token.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { ResetPasswordInterface } from '../../../class/user';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CommonModule, ButtonComponent, LoaderComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  token: string | null = null;
  error: string | null = null;
  isLoading: boolean = false;
  public passwordVisibility: boolean = false;
  public passwordConfirmVisibility: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {}

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
    ]),
  });

  get password() { return this.resetPasswordForm.get('password') || new FormControl(); }

  get passwordConfirm() { return this.resetPasswordForm.get('passwordConfirm') || new FormControl(); }

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

  ngOnInit() {
    this.isLoading = true;
    this.route.url.subscribe((urlSegments) => {
      this.token = this.tokenService.findToken(urlSegments);
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.isLoading = true;
    if(this.password?.value !== this.passwordConfirm?.value) {
      this.toastr.error('Passwords do not match');
    }
    if (this.resetPasswordForm.valid) {
      const formValue = this.resetPasswordForm.value;
      const userData: ResetPasswordInterface = {
        password: formValue.password || '',
        token: this.token || ''
      };

      this.authService.resetPassword(userData).subscribe({
        next: data => {
          this.isLoading = false;
          this.router.navigate(['/auth/login'], {
            queryParams: { success: 'Votre mot de passe a été modifié avec succès !' },
          });
        },
        error: error => {
          this.isLoading = false;
          this.toastr.error(error.error.message);
        }
      });
    } else {
      this.toastr.error('Please fill in all the fields');
    } 
  }
}
