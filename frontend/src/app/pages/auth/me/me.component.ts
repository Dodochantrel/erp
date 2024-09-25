import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    console.log(firstValueFrom(this.authService.me()));
  }
}
