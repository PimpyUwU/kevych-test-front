import React from 'react';
import { Train } from '@/models/Train';
import { TrainActions } from './TrainActions';

interface TrainCardProps {
    train: Train;
    onDelete: (trainId: number) => void;
}

export const TrainCard: React.FC<TrainCardProps> = ({ train, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{train.name}</h2>
                        <p className="text-gray-500 mt-1">Train ID: {train.id}</p>
                    </div>
                    <TrainActions
                        trainId={train.id}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};