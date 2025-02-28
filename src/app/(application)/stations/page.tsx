"use client";
import { useStations } from '@/hooks/useStations';
import { StationHeader } from '@/components/stations/StationHeader';
import { StationList } from '@/components/stations/StationList';
import Link from 'next/link';

export default function StationsPage() {
    const { stations, loading, error, deleteStation } = useStations();

    const handleDeleteStation = async (stationId: number) => {
        await deleteStation(stationId);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <StationHeader
                    title="Station Management"
                    description="View and manage available stations in the system"
                    backLink="/"
                    backLinkText="Back to Home"
                />

                <div className="mb-6 flex justify-between items-center">
                    <div className="text-lg font-medium text-gray-700">
                        {loading ? "Loading stations..." : `Total Stations: ${stations.length}`}
                    </div>
                    <Link
                        href="/stations/add"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                    >
                        Add New Station
                    </Link>
                </div>

                <StationList
                    stations={stations}
                    onDelete={handleDeleteStation}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
}