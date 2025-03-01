'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Train } from '@/models/Train';
import { Station } from '@/models/Station';
import { createRoute, updateRoute, fetchRoute } from '@/lib/api';
import api from '@/lib/axiosWithRefresh'
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";

interface RouteFormProps {
    routeId?: number;
    isEditing?: boolean;
}

export default function RouteForm({ routeId, isEditing = false }: RouteFormProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(isEditing);
    const [trains, setTrains] = useState<Train[]>([]);
    const [stations, setStations] = useState<Station[]>([]);
    const [formData, setFormData] = useState({
        trainId: '',
        stationId: '',
        date: '',
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/train`, {
                    withCredentials: true,
                });
                setTrains(response.data);
            } catch (error) {
                console.error('Error fetching trains:', error);
            }
        };

        const fetchStations = async () => {
            try {
                const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/station`, {
                    withCredentials: true,
                });
                setStations(response.data);
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        };

        fetchTrains();
        fetchStations();
    }, []);

    useEffect(() => {
        if (isEditing && routeId) {
            const fetchRouteData = async () => {
                try {
                    const route = await fetchRoute(routeId);
                    setFormData({
                        trainId: route.train.id.toString(),
                        stationId: route.station.id.toString(),
                        date: new Date(route.date).toISOString().slice(0, 16),
                    });
                } catch (err) {
                    setError('Failed to load route data');
                } finally {
                    setLoading(false);
                }
            };

            fetchRouteData();
        }
    }, [isEditing, routeId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const routeData = {
                trainId: Number(formData.trainId),
                stationId: Number(formData.stationId),
                date: formData.date,
            };

            if (isEditing && routeId) {
                await updateRoute(routeId, routeData);
            } else {
                await createRoute(routeData as any);
            }

            router.push('/routes');
        } catch (err) {
            setError('Failed to save route');
            setLoading(false);
        }
    };

    if (loading)
        return <LoadingSpinner/>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">{isEditing ? 'Edit route' : 'Add New Route'}</h2>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Train</label>
                    <select
                        name="trainId"
                        value={formData.trainId}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="">Select a train</option>
                        {trains.map(train => (
                            <option key={train.id} value={train.id} className="text-black">
                                {train.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Station</label>
                    <select
                        name="stationId"
                        value={formData.stationId}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="">Select a station</option>
                        {stations.map(station => (
                            <option key={station.id} value={station.id} className="text-black">
                                {station.city}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Date and Time</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded text-black"
                    />
                </div>

                <div className="flex gap-3">
                    <Button type="submit" variant="success">
                        {isEditing ? 'Update Route' : 'Create Route'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => router.push('/routes')}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}