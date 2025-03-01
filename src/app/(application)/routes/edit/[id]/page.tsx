"use client"

import React, {use, useEffect, useState} from 'react';
import RouteForm from '@/components/routes/RouteForm';

export default function EditRoutePage({ params } : any) {
    const [routeId, setRouteId] = useState<number | null>(null);

    const unwrappedParams = use(params as unknown as Promise<{ id: string }>);

    useEffect(() => {
        if (unwrappedParams) {
            setRouteId(parseInt(unwrappedParams.id, 10));
        }
    }, [unwrappedParams.id]);

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