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
            },
            error: (error) => {
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

    onPageChange(page: number): void {
        this.tableState.currentPage = page;
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