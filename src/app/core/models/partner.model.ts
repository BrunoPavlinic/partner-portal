export interface Partner {
    id: number;
    partnerName: string;
    partnerType: string;
    conversions: number;
    commissions: number;
    grosssales: number;
    contract: string;
}

export interface PartnerTableState {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    loading: boolean;
    error: string | null;
}

export interface PartnerFilters {
    partnerType?: string;
    dateRange?: {
        start: Date;
        end: Date;
    };
} 