import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partner, PartnerTableState } from '../../../core/models/partner.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-partner-table',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    templateUrl: './partner-table.component.html',
    styleUrls: ['./partner-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerTableComponent {
    @Input() partners: Partner[] = [];
    @Input() tableState!: PartnerTableState;
    @Output() pageChange = new EventEmitter<any>();
    @Output() sortChange = new EventEmitter<{active: string; direction: string}>();

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