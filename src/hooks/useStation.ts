import { useState, useEffect } from 'react';
import api from '@/lib/axiosWithRefresh'
import { Station, StationFormData } from '@/models/Station'

export const useStation = (stationId: number | null) => {
    const [station, setStation] = useState<Station | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (stationId) {
            fetchStation(stationId);
        }
    }, [stationId]);

    const fetchStation = async (id: number) => {
        setLoading(true);
        try {
            const response = await api.get<Station>(
                `${process.env.NEXT_PUBLIC_API_URL}/station/${id}`,
                { withCredentials: true }
            );
            setStation(response.data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch station details');
        } finally {
            setLoading(false);
        }
    };

    const updateStation = async (data: StationFormData) => {
        if (!stationId) return { success: false, error: 'No station ID provided' };

        try {
            await api.put(
                `${process.env.NEXT_PUBLIC_API_URL}/station/${stationId}`,
                data,
                { withCredentials: true }
            );
            return { success: true, error: null };
        } catch (err: any) {
            return {
                success: false,
                error: err.message || 'Error updating the station'
            };
        }
    };

    const createStation = async (data: StationFormData) => {
        try {
            const response = await api.post(
                `${process.env.NEXT_PUBLIC_API_URL}/station`,
                data,
                { withCredentials: true }
            );
            return {
                success: true,
                error: null,
                stationId: response.data.id
            };
        } catch (err: any) {
            return {
                success: false,
                error: err.message || 'Failed to add the station'
            };
        }
    };

    return {
        station,
        loading,
        error,
        updateStation,
        createStation
    };
};