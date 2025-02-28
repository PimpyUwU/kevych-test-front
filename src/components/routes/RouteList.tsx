'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import RouteTable from './RouteTable';
import RouteFilters from './RouteFilters';
import RouteSorting from './RouteSorting';
import Button from '@/components/ui/Button';
import { useRoutes } from '@/hooks/useRoutes';
import { useSorting } from '@/hooks/useSorting';
import { RouteFilters as RouteFiltersType } from '@/types';

export default function RouteList() {
    const searchParams = useSearchParams();
    const stationId = searchParams.get('station_id') ? Number(searchParams.get('station_id')) : undefined;
    const trainId = searchParams.get('train_id') ? Number(searchParams.get('train_id')) : undefined;

    const [filters, setFilters] = useState<RouteFiltersType>({
        search: '',
        stationId,
        trainId,
    });

    const { sortOptions, updateSort } = useSorting('date', 'asc');
    const { routes, loading, error, removeRoute, filterRoutes, sortRoutes } = useRoutes();

    // Apply filters and sorting
    const filteredRoutes = filterRoutes(routes, filters);
    const sortedRoutes = sortRoutes(filteredRoutes, sortOptions);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-black">Routes</h1>
                <Link href="/routes/add">
                    <Button variant="success">Add Route</Button>
                </Link>
            </div>

            <RouteFilters
                filters={filters}
                onFiltersChange={setFilters}
            />

            <RouteSorting
                sortOptions={sortOptions}
                onSortChange={updateSort}
            />

            <RouteTable
                routes={sortedRoutes}
                onDelete={removeRoute}
            />
        </div>
    );
}