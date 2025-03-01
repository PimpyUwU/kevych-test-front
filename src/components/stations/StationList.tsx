import { Station } from '@/models/Station';
import { StationCard } from './StationCard';
import Link from 'next/link';
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";
import {ErrorAlert} from "@/components/ui/ErrorAlert";

interface StationListProps {
    stations: Station[];
    onDelete: (stationId: number) => void;
    loading: boolean;
    error: string | null;
}

export const StationList: React.FC<StationListProps> = ({
                                                            stations,
                                                            onDelete,
                                                            loading,
                                                            error
                                                        }) => {
    if (loading) {
        return (
            <LoadingSpinner/>
        );
    }

    if (error) {
        return (
            <ErrorAlert message={error}></ErrorAlert>
        );
    }

    if (stations.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No Stations Found</h2>
                <p className="text-gray-500 mb-6">There are no stations in the system yet.</p>
                <Link
                    href="/stations/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Add Your First Station
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            {stations.map((station) => (
                <StationCard
                    key={station.id}
                    station={station}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};