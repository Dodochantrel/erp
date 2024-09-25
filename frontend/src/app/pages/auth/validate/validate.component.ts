import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [LoaderComponent, LoaderComponent],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css',
})
export class ValidateComponent {
  token: string | null = null;
  error: string | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.url.subscribe((urlSegments) => {
      this.token = this.tokenService.findToken(urlSegments);
      
      this.authService.validEmail(this.token).subscribe({
        next: (data) => {
          this.router.navigate(['/auth/login'], {
            queryParams: { success: 'Votre compte a été validé avec succès !' },
          });
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        },
      });
      this.isLoading = false;
    });
  }
}
