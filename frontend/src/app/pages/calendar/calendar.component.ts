import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NavigationComponent, ButtonComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  
}
