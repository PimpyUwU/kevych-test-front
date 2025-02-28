import React from 'react';
import Button from '@/components/ui/Button';
import { SortField, SortOptions } from '@/types';

interface RouteSortingProps {
    sortOptions: SortOptions;
    onSortChange: (field: SortField) => void;
}

export default function RouteSorting({ sortOptions, onSortChange }: RouteSortingProps) {
    const getSortButtonVariant = (field: SortField) =>
        sortOptions.field === field ? 'primary' : 'secondary';

    return (
        <div className="mb-4 flex flex-wrap gap-2">
            <Button
                variant={getSortButtonVariant('date')}
                onClick={() => onSortChange('date')}
            >
                Sort by Date {sortOptions.field === 'date' && (sortOptions.direction === 'asc' ? '↑' : '↓')}
            </Button>
            <Button
                variant={getSortButtonVariant('city')}
                onClick={() => onSortChange('city')}
            >
                Sort by City {sortOptions.field === 'city' && (sortOptions.direction === 'asc' ? '↑' : '↓')}
            </Button>
            <Button
                variant={getSortButtonVariant('train')}
                onClick={() => onSortChange('train')}
            >
                Sort by Train {sortOptions.field === 'train' && (sortOptions.direction === 'asc' ? '↑' : '↓')}
            </Button>
        </div>
    );
}
