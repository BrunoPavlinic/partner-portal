import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface ReportOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  pageTitle = 'Dashboard'; // Default title
  selectedReport = ''; // Default selected report
  reportOptions: ReportOption[] = []; // Will be populated based on current route
  private routerSubscription: Subscription | undefined;

  // Define options for different pages
  private dashboardPlates: ReportOption[] = [
    { value: 'analytics', label: 'Analytics Dashboard' },
    { value: 'summary', label: 'Summary View' },
    { value: 'detailed', label: 'Detailed View' }
  ];

  private partnersPlates: ReportOption[] = [
    { value: 'active', label: 'Active Partners' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'archived', label: 'Archived Partners' }
  ];

  private approvalsPlates: ReportOption[] = [
    { value: 'new', label: 'New Requests' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'completed', label: 'Completed Approvals' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events to update the page title and plate options
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url.split('/')[1] || 'dashboard';
      
      // Format the route path to title case (e.g., 'dashboard' -> 'Dashboard')
      this.pageTitle = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
      
      // Update plate options based on current route
      this.updatePlateOptions(currentRoute);
    });
    
    // Initialize plate options for the initial route
    const initialRoute = this.router.url.split('/')[1] || 'dashboard';
    this.updatePlateOptions(initialRoute);
  }

  private updatePlateOptions(route: string): void {
    switch (route) {
      case 'partners':
        this.reportOptions = this.partnersPlates;
        break;
      case 'approvals':
        this.reportOptions = this.approvalsPlates;
        break;
      case 'dashboard':
      default:
        this.reportOptions = this.dashboardPlates;
        break;
    }
    
    // Set the first option as selected by default if not already set for this route
    if (this.reportOptions.length > 0) {
      this.selectedReport = this.reportOptions[0].value;
    }
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onAccountClick() {
    alert('User settings clicked');
  }

  onLogoutClick() {
    alert('User logout clicked');
  }

  onReportChange(event: Event) {
    alert('Report changed to ' + (event.target as HTMLSelectElement).value);
  }
} 