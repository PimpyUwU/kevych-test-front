"use client"

import React, { useEffect, useState } from 'react';
import RouteForm from '@/components/routes/RouteForm';

export default function EditRoutePage({
                                          params
                                      }: {
    params: { id: string }
}) {
    const [routeId, setRouteId] = useState<number | null>(null);

    useEffect(() => {
        if (params.id) {
            setRouteId(parseInt(params.id, 10));
        }
    }, [params.id]);

    if (routeId === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <RouteForm routeId={routeId} isEditing={true} />
            </div>
        </div>
    );
}