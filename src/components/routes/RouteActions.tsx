import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface RouteActionsProps {
    routeId: number;
    onDelete: (id: number) => void;
}

export default function RouteActions({ routeId, onDelete }: RouteActionsProps) {
    return (
        <div className="flex space-x-2">
            <Link href={`/routes/edit/${routeId}`}>
                <Button variant="primary" size="sm">
                    Edit
                </Button>
            </Link>
            <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(routeId)}
            >
                Delete
            </Button>
        </div>
    );
}