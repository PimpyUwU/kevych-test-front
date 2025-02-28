import { useState, useEffect } from 'react';
import { Route } from '@/models/Route';
import { RouteFilters, SortOptions } from '@/types';
import { fetchRoutes, deleteRoute } from '@/lib/api';

export function useRoutes() {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRoutes = async () => {
        setLoading(true);
        try {
            const data = await fetchRoutes();
            setRoutes(data);
            setError(null);
        } catch (err) {
            setError('Failed to load routes');
            console.error('Error fetching routes:', err);
        } finally {
            setLoading(false);
        }
    };

    const removeRoute = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this route?')) {
            try {
                await deleteRoute(id);
                setRoutes(routes.filter(route => route.id !== id));
            } catch (err) {
                alert('You must be authorized');
                console.error('Error deleting route:', err);
            }
        }
    };

    const filterRoutes = (routes: Route[], filters: RouteFilters) => {
        return routes.filter(route => {
            // Filter by station_id if available
            if (filters.stationId && route.station.id !== filters.stationId) {
                return false;
            }
            // Filter by train_id if available
            if (filters.trainId && route.train.id !== filters.trainId) {
                return false;
            }
            // Filter by search term
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                return route.train.name.toLowerCase().includes(searchTerm) ||
                    route.station.city.toLowerCase().includes(searchTerm);
            }
            return true;
        });
    };

    const sortRoutes = (routes: Route[], sortOptions: SortOptions) => {
        return [...routes].sort((a, b) => {
            let valueA, valueB;

            switch (sortOptions.field) {
                case 'date':
                    valueA = new Date(a.date);
                    valueB = new Date(b.date);
                    break;
                case 'city':
                    valueA = a.station.city.toLowerCase();
                    valueB = b.station.city.toLowerCase();
                    break;
                case 'train':
                    valueA = a.train.name.toLowerCase();
                    valueB = b.train.name.toLowerCase();
                    break;
                default:
                    valueA = new Date(a.date);
                    valueB = new Date(b.date);
            }

            if (sortOptions.direction === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });
    };

    useEffect(() => {
        loadRoutes();
    }, []);

    return {
        routes,
        loading,
        error,
        loadRoutes,
        removeRoute,
        filterRoutes,
        sortRoutes,
    };
}