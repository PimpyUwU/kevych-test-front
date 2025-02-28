"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddRoutePage() {
    const [trainId, setTrainId] = useState("");  // Updated to store trainId
    const [stationCity, setStationCity] = useState("");
    const [date, setDate] = useState(new Date());
    const [trains, setTrains] = useState([]);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Fetch available trains
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/train`)
            .then(response => setTrains(response.data))
            .catch(error => console.error("Error fetching trains:", error));

        // Fetch available stations (cities)
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/station`)
            .then(response => setStations(response.data))
            .catch(error => console.error("Error fetching stations:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const newRoute = {
            trainId: trainId,
            stationId: stationCity,
            date: date.toISOString(),
        };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/route`, newRoute, {
                withCredentials: true,
            });
            setSuccessMessage("Route added successfully!");
            setTrainId("");
            setStationCity("");
            setDate(new Date());
        } catch (error) {
            console.error("Error adding route:", error);
            alert("Error adding route");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">Add Route</h1>

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
                            onChange={(e) => setTrainId(e.target.value)} // Save the train id
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

                    {/* DateTime Picker */}
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-black">
                            Date & Time
                        </label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat="yyyy-MM-dd HH:mm"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}  // Time intervals of 15 minutes
                            className="w-full p-2 mt-2 border rounded-md text-black"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 mt-4 text-white rounded-md ${
                            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {loading ? "Adding Route..." : "Add Route"}
                    </button>
                </form>
            </div>
        </div>
    );
}
