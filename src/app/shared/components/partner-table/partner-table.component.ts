import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partner, PartnerTableState, TableActionButton, TableFilterButton } from '../../../core/models/partner.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-partner-table',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './partner-table.component.html',
    styleUrls: ['./partner-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerTableComponent {
    @Input() partners: Partner[] = [];
    @Input() tableState!: PartnerTableState;
    @Input() actionButtons: TableActionButton[] = [];
    @Input() filterButtons: TableFilterButton[] = [];
    @Output() pageChange = new EventEmitter<any>();
    @Output() sortChange = new EventEmitter<{active: string; direction: string}>();
    @Output() buttonClick = new EventEmitter<string>();
    @Output() dateRangeChange = new EventEmitter<{start: Date, end: Date}>();

    startDate: Date | null = null;
    endDate: Date | null = null;
    dateRangeLabel: string = 'July 6, 2022 - Aug 5, 2022';

    displayedColumns: string[] = [
        'id',
        'partnerName',
        'partnerType',
        'contract',
        'grosssales',
        'commissions',
        'conversions',
        'actions'
    ];

    onPageChange(event: any): void {
        this.pageChange.emit(event);
    }

    onSortChange(event: any): void {
        this.sortChange.emit({
            active: event.active,
            direction: event.direction
        });
    }

    onButtonClick(action: string | (() => void)): void {
        if (typeof action === 'function') {
            // If action is a function, call it directly
            action();
        } else {
            // Otherwise, emit the action string for the parent component to handle
            this.buttonClick.emit(action);
        }
    }

    onDateRangeApply(): void {
        if (this.startDate && this.endDate) {
            this.dateRangeChange.emit({
                start: this.startDate,
                end: this.endDate
            });
            
            // Update the displayed label
            const formatDate = (date: Date) => {
                const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
                return date.toLocaleDateString('en-US', options);
            };
            
            this.dateRangeLabel = `${formatDate(this.startDate)} - ${formatDate(this.endDate)}`;
        }
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    onPartnerDetails(): void {
        alert('Details functionality coming soon!');
    }
} 