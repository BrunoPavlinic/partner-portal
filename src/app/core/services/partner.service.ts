import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Partner } from '../models/partner.model';
import { API_ENDPOINTS } from '../constants/api.constants';

@Injectable({
    providedIn: 'root'
})
export class PartnerService {
    constructor(private http: HttpClient) {}

    getPartners(): Observable<Partner[]> {
        return of([
            {
                id: '1',
                partnerName: 'Green Living',
                partnerType: 'Influencer', 
                conversions: 7,
                commissions: 420,
                grosssales: 620,
                contract: 'Partner Default'
            },
            {
                id: '2',
                partnerName: 'Tech Reviews Pro',
                partnerType: 'Content Creator',
                conversions: 12,
                commissions: 850,
                grosssales: 1200,
                contract: 'Premium Partner'
            },
            {
                id: '3',
                partnerName: 'Fitness First',
                partnerType: 'Affiliate',
                conversions: 5,
                commissions: 300,
                grosssales: 450,
                contract: 'Partner Default'
            },
            {
                id: '4',
                partnerName: 'Green Living',
                partnerType: 'Influencer', 
                conversions: 7,
                commissions: 420,
                grosssales: 620,
                contract: 'Partner Default'
            },
            {
                id: '5',
                partnerName: 'Tech Reviews Pro',
                partnerType: 'Content Creator',
                conversions: 12,
                commissions: 850,
                grosssales: 1200,
                contract: 'Premium Partner'
            },
            {
                id: '6',
                partnerName: 'Fitness First',
                partnerType: 'Affiliate',
                conversions: 5,
                commissions: 300,
                grosssales: 450,
                contract: 'Partner Default'
            }
        ]);
        // return this.http.get<Partner[]>(API_ENDPOINTS.PARTNERS.LIST)
        //     .pipe(
        //         catchError(error => {
        //             console.error('Error fetching partners:', error);
        //             return of([]);
        //         })
        //     );
    }

    // Helper method to paginate partners on the client side
    paginatePartners(partners: Partner[], page: number, pageSize: number): Partner[] {
        const startIndex = (page - 1) * pageSize;
        return partners.slice(startIndex, startIndex + pageSize);
    }

    // Helper method to sort partners
    sortPartners(partners: Partner[], field: keyof Partner, ascending: boolean = true): Partner[] {
        return [...partners].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return ascending ? 
                    aValue.localeCompare(bValue) : 
                    bValue.localeCompare(aValue);
            }
            
            return ascending ? 
                (aValue as number) - (bValue as number) : 
                (bValue as number) - (aValue as number);
        });
    }

    // Helper method to filter partners
    filterPartners(partners: Partner[], filters: Partial<Partner>): Partner[] {
        return partners.filter(partner => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                return partner[key as keyof Partner]?.toString().toLowerCase()
                    .includes(value.toString().toLowerCase());
            });
        });
    }
} 