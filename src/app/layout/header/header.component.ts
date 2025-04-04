import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  reportControl = new FormControl('power');
  reportOptions: {value: string, viewValue: string}[] = [
    {value: 'power', viewValue: 'Power Plate'},
    {value: 'super', viewValue: 'Super Plate'},
    {value: 'mega', viewValue: 'Mega Plate'}
  ];

  onReportChange(value: string | null): void {
    if (value) {
      alert(`Report value changed to: ${value}`);
    }
  }

  onAccountClick() {
    alert('User settings clicked');
  }

  onLogoutClick() {
    alert('User logout clicked');
  }
} 