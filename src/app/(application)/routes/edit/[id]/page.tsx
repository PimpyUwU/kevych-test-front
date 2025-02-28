// pages/routes/edit/[id].tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditRoutePage() {
    const { id } = useParams(); // Get the route id from the URL parameters
    const [route, setRoute] = useState(null);
    const [trainId, setTrainId] = useState("");
    const [stationCity, setStationCity] = useState("");
    const [date, setDate] = useState(new Date());
    const [trains, setTrains] = useState([]);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Fetch available trains and stations
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/train`)
            .then(response => setTrains(response.data))
            .catch(error => console.error("Error fetching trains:", error));

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/station`)
            .then(response => setStations(response.data))
            .catch(error => console.error("Error fetching stations:", error));

        // Fetch the specific route to edit
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/route/${id}`)
                .then(response => {
                    const routeData = response.data;
                    setRoute(routeData);
                    setTrainId(routeData.train.id);
                    setStationCity(routeData.station.id);
                    setDate(new Date(routeData.date));
                })
                .catch(error => console.error("Error fetching route:", error))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const updatedRoute = {
            trainId,
            stationId: stationCity,
            date: date.toISOString(),
        };

        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/route/${id}`, updatedRoute, {
                withCredentials: true,
            });
            setSuccessMessage("Route updated successfully!");
            // Redirect back to routes list page after update
            setTimeout(() => window.location.href = "/routes", 2000);
        } catch (error) {
            console.error("Error updating route:", error);
            alert("Error updating route");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">Edit Route</h1>

                {successMessage && (
                    <div className="bg-green-200 text-green-700 p-4 mb-6 rounded-md">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    {/* Train Selection */}
                    <div className="mb-4">
                        <label htmlFor="trainId" className="block text-sm font-medium text-black">
                            Train
                        </label>
                        <select
                            id="trainId"
                            value={trainId}
                            onChange={(e) => setTrainId(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border rounded-md text-black"
                        >
                            <option value="">Select a Train</option>
                            {trains.map((train) => (
                                <option key={train.id} value={train.id}>
                                    {train.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Station Selection */}
                    <div className="mb-4">
                        <label htmlFor="stationCity" className="block text-sm font-medium text-black">
                            Station
                        </label>
                        <select
                            id="stationCity"
                            value={stationCity}
                            onChange={(e) => setStationCity(e.target.value)}
                            required
                            className="w-full p-2 mt-2 border rounded-md text-black"
                        >
                            <option value="">Select a Station</option>
                            {stations.map((station) => (
                                <option key={station.id} value={station.id}>
                                    {station.city}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Picker */}
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-black">
                            Date
                        </label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="w-full p-2 mt-2 border rounded-md text-black"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 mt-4 text-white rounded-md ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
                    >
                        {loading ? "Updating Route..." : "Update Route"}
                    </button>
                </form>

                <div className="mt-4">
                    <Link href="/routes" className="text-blue-600 hover:underline">
                        Back to Routes List
                    </Link>
                </div>
            </div>
        </div>
    );
}
