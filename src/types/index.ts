export type SortField = 'date' | 'city' | 'train';
export type SortDirection = 'asc' | 'desc';

export interface RouteFilters {
    search: string;
    stationId?: number;
    trainId?: number;
}

export interface SortOptions {
    field: SortField;
    direction: SortDirection;
}