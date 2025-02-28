"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function EditStationPage() {
    const [station, setStation] = useState({ city: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stationId, setStationId] = useState<number | null>(null);

    useEffect(() => {
        const path = window.location.pathname;
        const id = path.split("/")[3];
        setStationId(Number(id));

        if (id) {
            fetchStation(id);
        }
    }, []);

    const fetchStation = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/station/${id}`,
                { withCredentials: true }
            );
            setStation(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStation({ ...station, city: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stationId) return;

        setIsSubmitting(true);
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/station/${stationId}`,
                { city: station.city },
                { withCredentials: true }
            );
            alert("Station updated successfully");
            window.location.href = "/stations";
        } catch (error) {
            alert("Error updating the station");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Edit Station</h1>
                        <p className="text-lg text-gray-600 mt-2">Modify the details of the station</p>
                    </div>
                    <Link
                        href="/stations"
                        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back to Stations
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label
                            htmlFor="stationCity"
                            className="block text-lg font-medium text-gray-700"
                        >
                            Station City
                        </label>
                        <input
                            id="stationCity"
                            type="text"
                            value={station.city}
                            onChange={handleChange}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            placeholder="Enter the station city"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => window.location.href = "/stations"}
                            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
