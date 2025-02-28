import { useState, useEffect } from 'react';
import api from '@/lib/axiosWithRefresh'
import { Train } from '@/models/Train';

export const useTrainById = (id: number | null) => {
    const [train, setTrain] = useState<Train | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id === null) {
            setLoading(false);
            return;
        }

        const fetchTrain = async () => {
            setLoading(true);
            try {
                const response = await api.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/train/${id}`,
                    { withCredentials: true }
                );
                setTrain(response.data);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching train:', err);
                setError(err.message || 'Failed to fetch train details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrain();
    }, [id]);

    return { train, loading, error };
};