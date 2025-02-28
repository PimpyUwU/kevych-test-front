import React from 'react';
import RouteForm from '@/components/routes/RouteForm';

export const metadata = {
    title: 'Add New Route',
    description: 'Create a new train route',
};

export default function AddRoutePage() {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <RouteForm />
            </div>
        </div>
    );
}