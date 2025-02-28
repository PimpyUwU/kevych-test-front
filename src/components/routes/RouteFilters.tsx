import React from 'react';
import SearchInput from '@/components/ui/SearchInput';
import { RouteFilters } from '@/types';

interface RouteFiltersProps {
    filters: RouteFilters;
    onFiltersChange: (filters: RouteFilters) => void;
}

export default function RouteFiltersComponent({ filters, onFiltersChange }: RouteFiltersProps) {
    const handleSearchChange = (search: string) => {
        onFiltersChange({ ...filters, search });
    };

    return (
        <div className="mb-4">
            <SearchInput
                value={filters.search}
                onChange={handleSearchChange}
                placeholder="Search by train name or station city"
            />
        </div>
    );
}