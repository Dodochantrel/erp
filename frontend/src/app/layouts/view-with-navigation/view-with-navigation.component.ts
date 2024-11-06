import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'app-view-with-navigation',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './view-with-navigation.component.html',
  styleUrl: './view-with-navigation.component.css',
})
export class ViewWithNavigationComponent {}
