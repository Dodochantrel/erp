import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { NavigationProfileComponent } from '../navigation-profile/navigation-profile.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, NavigationProfileComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {  
  public isOpenNaviation: boolean = true;


  public navigationItems: NavigationItem[] = [
    { name: 'Accueil', icon: 'home', path: '/home' },
    { name: 'Calendrier', icon: 'calendar_today', path: '/calendar' },
    { name: 'Devis', icon: 'description', path: '/quote' },
    { name: 'Factures', icon: 'receipt', path: '/invoice' },
    { name: 'Clients', icon: 'people', path: '/customer' },
  ];   
  
  public toggleSubNavigation(navigationItem: NavigationItem): void {
    navigationItem.isOpen = !navigationItem.isOpen;
  }

  public toggleNavigation(): void {
    this.isOpenNaviation = !this.isOpenNaviation;
  }
}

interface NavigationItem {
  name: string;
  icon: string;
  path: string | null;
  isOpen?: boolean;
  subNavigationItems?: SubNavigationItem[];
}

interface SubNavigationItem {
  name: string;
  icon: string;
  path: string;
}