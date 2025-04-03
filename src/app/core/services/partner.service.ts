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
        return this.http.get<any>(API_ENDPOINTS.PARTNERS.LIST)
            .pipe(
                map(response => {
                    // Convert object response to array if needed
                    let partners: any[];
                    if (response && !Array.isArray(response)) {
                        partners = Object.values(response);
                    } else {
                        partners = response;
                    }

                    // Convert string IDs to numbers and ensure correct typing
                    return partners.map(partner => ({
                        ...partner,
                        id: parseInt(partner.id, 10),
                        conversions: Number(partner.conversions),
                        commissions: Number(partner.commissions),
                        grosssales: Number(partner.grosssales)
                    } as Partner));
                }),
                catchError(error => {
                    console.error('Error fetching partners:', error);
                    return of([]);
                })
            );
    }

    // Helper method to paginate partners on the client side
    paginatePartners(partners: Partner[] | Record<string, Partner>, page: number, pageSize: number): Partner[] {        
        // Check if partners is an object with numeric keys instead of an array
        if (!Array.isArray(partners)) {
            // Convert object to array
            partners = Object.values(partners);
        }
        
        const startIndex = (page - 1) * pageSize;
        const result = partners.slice(startIndex, startIndex + pageSize);
        return result;
    }

    // Helper method to sort partners
    sortPartners(partners: Partner[] | Record<string, Partner>, field: keyof Partner, ascending: boolean = true): Partner[] {
        // Convert to array if it's an object
        if (!Array.isArray(partners)) {
            partners = Object.values(partners);
        }

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
    filterPartners(partners: Partner[] | Record<string, Partner>, filters: Partial<Partner>): Partner[] {
        // Convert to array if it's an object
        if (!Array.isArray(partners)) {
            partners = Object.values(partners);
        }

        return partners.filter(partner => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                return partner[key as keyof Partner]?.toString().toLowerCase()
                    .includes(value.toString().toLowerCase());
            });
        });
    }
} 