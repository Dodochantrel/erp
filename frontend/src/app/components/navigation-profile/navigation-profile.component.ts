import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-profile',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './navigation-profile.component.html',
  styleUrl: './navigation-profile.component.css'
})
export class NavigationProfileComponent {
  constructor(private readonly authService: AuthService, private router: Router) {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
