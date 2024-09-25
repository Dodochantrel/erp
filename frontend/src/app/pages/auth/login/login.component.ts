import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../components/button/button.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginInterface } from '../../../class/user';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from '../../../services/cookie.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, ButtonComponent, LoaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  passwordVisibility: boolean = false;
  isLoading: boolean = false;
  param: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private authService: AuthService, private cookieService: CookieService) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() { return this.loginForm.get('email') || new FormControl(); }

  get password() { return this.loginForm.get('password') || new FormControl(); }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.param = params['success'];
    });
    if(this.param !== undefined && this.param !== null) {
      this.toastr.success(this.param);
    }
  }

  handlerPassword() {
    this.passwordVisibility = !this.passwordVisibility;
    const passwordElement = document.getElementById('password');
    if (passwordElement) {
        const newType = this.passwordVisibility ? 'text' : 'password';
        passwordElement.setAttribute('type', newType);
    }
  }

  onSubmit() {
    this.isLoading = true;
    const formValue = this.loginForm.value;
    const userData: LoginInterface = {
      email: formValue.email || '',
      password: formValue.password || ''
    };
    this.authService.login(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/auth/me']);
      },
      error: (error) => {
        this.toastr.error(error.error.message);
        this.isLoading = false;
      },
    })
  }
}
