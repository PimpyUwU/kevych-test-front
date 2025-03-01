"use client"

import React, { useEffect, useState, Suspense, use } from 'react';
import RouteForm from '@/components/routes/RouteForm';
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";

function RouteLoader({ params, onIdLoaded }: { params: any, onIdLoaded: (id: number) => void }) {
    const unwrappedParams = use(params as unknown as Promise<{ id: string }>);

    useEffect(() => {
        if (unwrappedParams && unwrappedParams.id) {
            onIdLoaded(parseInt(unwrappedParams.id, 10));
        }
    }, [unwrappedParams, onIdLoaded]);

    return null;
}

export default function EditRoutePage({ params }: any) {
    const [routeId, setRouteId] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <Suspense fallback={<LoadingSpinner/>}>
                    <RouteLoader
                        params={params}
                        onIdLoaded={(id) => setRouteId(id)}
                    />
                </Suspense>

                {routeId === null ? (
                    <LoadingSpinner/>
                ) : (
                    <RouteForm routeId={routeId} isEditing={true} />
                )}
            </div>
        </div>
    );
}