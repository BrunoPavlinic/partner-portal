import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partner, PartnerTableState, TableActionButton, TableFilterButton } from '../../core/models/partner.model';
import { PartnerService } from '../../core/services/partner.service';
import { PartnerTableComponent } from '../../shared/components/partner-table/partner-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { API_CONFIG } from '../../core/constants/api.constants';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        PartnerTableComponent,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private partnerService = inject(PartnerService);
    
    partners: Partner[] = [];
    filteredPartners: Partner[] = [];
    tableState: PartnerTableState = {
        currentPage: 1,
        pageSize: API_CONFIG.DEFAULT_PAGE_SIZE,
        totalItems: 0,
        loading: true,
        error: null
    };

    // Define action buttons
    tableActionButtons: TableActionButton[] = [
        {
            label: 'Choose Columns',
            cssClass: 'action-btn primary-btn',
            icon: 'reorder',
            action: () => this.chooseColumns()
        },
        {
            label: 'Message Partners',
            cssClass: 'action-btn primary-btn',
            icon: 'mail_outlined',
            action: () => this.messagePartners()
        },
        {
            label: 'Export List',
            cssClass: 'action-btn primary-btn',
            icon: 'download',
            action: () => this.exportList()
        }
    ];

    // Define filter buttons
    tableFilterButtons: TableFilterButton[] = [
        {
            label: 'Date Range',
            cssClass: 'filter-btn date-range-btn',
            icon: 'calendar_month',
            isDateRange: true,
            action: () => this.onDateRangeChange()
        }
    ];

    ngOnInit(): void {
        this.loadPartners();
    }

    private loadPartners(): void {
        this.tableState.loading = true;
        this.tableState.error = null;

        this.partnerService.getPartners().subscribe({
            next: (partners) => {
                this.partners = partners;
                this.tableState.totalItems = partners.length;
                this.updateDisplayedPartners();
                this.tableState.loading = false;
                
                // Show error message if no partners are returned but no explicit error occurred
                if (partners.length === 0) {
                    this.tableState.error = 'No partners data available.';
                }
            },
            error: (error) => {
                this.partners = [];
                this.filteredPartners = [];
                this.tableState.totalItems = 0;
                this.tableState.error = 'Failed to load partners. Please try again later.';
                this.tableState.loading = false;
            }
        });
    }

    private updateDisplayedPartners(): void {
        this.filteredPartners = this.partnerService.paginatePartners(
            this.partners,
            this.tableState.currentPage,
            this.tableState.pageSize
        );
    }

    onPageChange(event: any): void {
        this.tableState.currentPage = event.pageIndex + 1;
        if (this.tableState.pageSize !== event.pageSize) {
            this.tableState.pageSize = event.pageSize;
        }
        this.updateDisplayedPartners();
    }

    onSortChange(event: {active: string; direction: string}): void {
        if (event.direction) {
            this.partners = this.partnerService.sortPartners(
                this.partners,
                event.active as keyof Partner,
                event.direction === 'asc'
            );
            this.updateDisplayedPartners();
        }
    }

    onDateRangeChange(range?: {start: Date, end: Date}): void {
        if (range) {
            alert(`Date range changed to: ${range.start.toDateString()} - ${range.end.toDateString()}`);
        }
    }

    private chooseColumns(): void {
        alert('Choose Columns functionality coming soon!');
    }

    private messagePartners(): void {
        alert('Message Partners functionality coming soon!');
    }

    private exportList(): void {
        alert('Export List functionality coming soon!');
    }
} 