import React from 'react';
import RouteActions from './RouteActions';
import { Route } from '@/models/Route';

interface RouteTableProps {
    routes: Route[];
    onDelete: (id: number) => void;
}

export default function RouteTable({ routes, onDelete }: RouteTableProps) {
    if (routes.length === 0) {
        return <div className="text-center py-8">No routes found</div>;
    }

    return (
        <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
            <tr className="bg-gray-200">
                <th className="p-2 text-left text-black">Train</th>
                <th className="p-2 text-left text-black">Station</th>
                <th className="p-2 text-left text-black">Date and time</th>
                <th className="p-2 text-black">Actions</th>
            </tr>
            </thead>
            <tbody>
            {routes.map(route => (
                <tr key={route.id} className="border-t">
                    <td className="p-2 text-black">{route.train.name}</td>
                    <td className="p-2 text-black">{route.station.city}</td>
                    <td className="p-2 text-black">{new Date(route.date).toLocaleDateString()} at {new Date(route.date).toLocaleTimeString()}</td>
                    <td className="p-2">
                        <RouteActions routeId={route.id} onDelete={onDelete} />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}