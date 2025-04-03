import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partner, PartnerTableState } from '../../core/models/partner.model';
import { PartnerService } from '../../core/services/partner.service';
import { PartnerTableComponent } from '../../shared/components/partner-table/partner-table.component';
import { MatButtonModule } from '@angular/material/button';
import { API_CONFIG } from '../../core/constants/api.constants';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        PartnerTableComponent,
        MatButtonModule
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
} 