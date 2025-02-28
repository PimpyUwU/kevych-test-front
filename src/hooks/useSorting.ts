import { useState } from 'react';
import { SortField, SortDirection, SortOptions } from '@/types';

export function useSorting(initialField: SortField = 'date', initialDirection: SortDirection = 'asc') {
    const [sortOptions, setSortOptions] = useState<SortOptions>({
        field: initialField,
        direction: initialDirection,
    });

    const updateSort = (field: SortField) => {
        setSortOptions(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    return {
        sortOptions,
        updateSort,
    };
}