import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/axiosWithRefresh'
import { Station, StationFormData } from '@/models/Station';

export const useStations = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStations = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get<Station[]>(
                `${process.env.NEXT_PUBLIC_API_URL}/station`,
                { withCredentials: true }
            );
            setStations(response.data);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch stations:", err);
            setError(err.message || 'An error occurred while fetching stations');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStations();
    }, [fetchStations]);

    const deleteStation = async (stationId: number) => {
        try {
            await api.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/station/${stationId}`,
                { withCredentials: true }
            );
            setStations((prevStations) =>
                prevStations.filter((station) => station.id !== stationId)
            );
            return true;
        } catch (err) {
            return false;
        }
    };

    return {
        stations,
        loading,
        error,
        fetchStations,
        deleteStation
    };
};