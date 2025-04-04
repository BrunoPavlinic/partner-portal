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

export interface TableActionButton {
    label: string;
    cssClass: string;
    icon?: string;
    action: string | (() => void); // Can be either an action identifier string or a callable function
}

export interface TableFilterButton {
    label: string;
    cssClass: string;
    icon?: string;
    isDateRange?: boolean;
    action: string | (() => void); // Can be either an action identifier string or a callable function
} 