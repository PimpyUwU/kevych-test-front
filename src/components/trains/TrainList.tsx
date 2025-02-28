import React from 'react';
import { Train } from '@/models/Train';
import { TrainCard } from './TrainCard';
import { EmptyState } from './EmptyState';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorAlert } from '../ui/ErrorAlert';

interface TrainListProps {
    trains: Train[];
    loading: boolean;
    error: string | null;
    onDeleteTrain: (trainId: number) => void;
}

export const TrainList: React.FC<TrainListProps> = ({
                                                        trains,
                                                        loading,
                                                        error,
                                                        onDeleteTrain
                                                    }) => {
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorAlert message={`Failed to load trains: ${error}`} />;
    }

    if (trains.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid gap-6">
            {trains.map((train) => (
                <TrainCard
                    key={train.id}
                    train={train}
                    onDelete={onDeleteTrain}
                />
            ))}
        </div>
    );
};