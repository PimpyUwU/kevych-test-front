import { useState, useEffect, useCallback } from 'react';
import { Train } from '@/models/Train';

export const useTrains = () => {
    const [trains, setTrains] = useState<Train[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTrains = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/train`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Error fetching trains: ${response.status}`);
            }

            const data = await response.json();
            setTrains(data);
            setError(null);
        } catch (err: any) {
            console.error('Failed to fetch trains:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTrains();
    }, [fetchTrains]);

    return {
        trains,
        loading,
        error,
        fetchTrains,
        setTrains
    };
};