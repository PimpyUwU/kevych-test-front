import React from 'react';
import RouteList from '@/components/routes/RouteList';

export const metadata = {
    title: 'Routes',
    description: 'View all train routes',
};

export default function RoutesPage() {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <RouteList />
            </div>
        </div>
    );
}