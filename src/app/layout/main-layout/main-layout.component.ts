import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    SidebarComponent, 
    HeaderComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isMobile = window.innerWidth < 768;

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  onSidebarLinkClicked(sidenav: MatSidenav): void {
    // Only close the sidenav if in mobile mode
    if (this.isMobile) {
      sidenav.close();
    }
  }
} 