"use client";
import Link from "next/link";
import { useDeleteTrain } from "@/hooks/useDeleteTrain";

interface TrainActionsProps {
    trainId: number;
    onDelete: (trainId: number) => void;
}

export const TrainActions: React.FC<TrainActionsProps> = ({ trainId, onDelete }) => {
    const { deleteTrain, loading: isDeleting } = useDeleteTrain(onDelete);

    const handleDelete = async () => {
        await deleteTrain(trainId);
    };

    return (
        <div className="flex space-x-2">
            <Link
                href={`/trains/edit/${trainId}`}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors duration-200"
            >
                Edit
            </Link>
            <Link
                href={`/routes?train_id=${trainId}`}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200"
            >
                Routes
            </Link>
            <button
                className={`px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    );
};