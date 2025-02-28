"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StationActions from "./StationActions";

export default function StationsPage() {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStations = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/station`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Error fetching stations: ${response.status}`);
            }

            const data = await response.json();
            setStations(data);
            setLoading(false);
        } catch (err : any) {
            console.error("Failed to fetch stations:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStations();
    }, []);

    const handleDeleteStation = (stationId: number) => {
        setStations((prevStations) => prevStations.filter((station : any) => station.id !== stationId));
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Station Management</h1>
                        <p className="text-lg text-gray-600 mt-2">
                            View and manage available stations in the system
                        </p>
                    </div>
                    <Link href="/"
                          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                        Back to Home
                    </Link>
                </div>

                <div className="mb-6 flex justify-between items-center">
                    <div className="text-lg font-medium text-gray-700">
                        {loading ? "Loading stations..." : `Total Stations: ${stations.length}`}
                    </div>
                    <Link href="/stations/add"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                        Add New Station
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <p className="text-sm text-red-700">Failed to load stations: {error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center my-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : stations.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">No Stations Found</h2>
                        <p className="text-gray-500 mb-6">There are no stations in the system yet.</p>
                        <Link href="/stations/add"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                            Add Your First Station
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {stations.map((station : any) => (
                            <div key={station.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">{station.city}</h2>
                                            <p className="text-gray-500 mt-1">Station ID: {station.id}</p>
                                        </div>
                                        <StationActions
                                            stationId={station.id}
                                            onDelete={() => handleDeleteStation(station.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
