"use client";
import Link from "next/link";
import { useTrains } from "@/hooks/useTrains";
import { PageHeader } from "@/components/trains/PageHeader";
import { TrainList } from "@/components/trains/TrainList";

export default function TrainsPage() {
    const { trains, loading, error, setTrains } = useTrains();

    const handleDeleteTrain = (trainId: number) => {
        setTrains((prevTrains) => prevTrains.filter((train) => train.id !== trainId));
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <PageHeader
                    title="Train Management"
                    subtitle="View and manage available trains in the system"
                    backUrl="/"
                    backText="Back to Home"
                />

                <div className="mb-6 flex justify-between items-center">
                    <div className="text-lg font-medium text-gray-700">
                        {loading ? "Loading trains..." : `Total Trains: ${trains.length}`}
                    </div>
                    <Link href="/trains/add"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New Train
                    </Link>
                </div>

                <TrainList
                    trains={trains}
                    loading={loading}
                    error={error}
                    onDeleteTrain={handleDeleteTrain}
                />
            </div>
        </div>
    );
}