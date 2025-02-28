"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RoutesPage() {
    const [routes, setRoutes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState("date");
    const [sortDirection, setSortDirection] = useState("asc");

    const searchParams = useSearchParams();
    const stationIdFilter = searchParams.get("station_id");
    const trainIdFilter = searchParams.get("train_id");

    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/route`);
            setRoutes(response.data);
        } catch (error) {
            console.error("Error fetching routes:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRoutes = routes
        .filter(route => {
            // Filter by station_id if available in query params
            if (stationIdFilter && route.station.id !== Number(stationIdFilter)) {
                return false;
            }
            // Filter by train_id if available in query params
            if (trainIdFilter && route.train.id !== Number(trainIdFilter)) {
                return false;
            }
            return true;
        })
        .filter(route =>
            route.train.name.toLowerCase().includes(search.toLowerCase()) ||
            route.station.city.toLowerCase().includes(search.toLowerCase())
        );

    const sortedRoutes = filteredRoutes.sort((a, b) => {
        let valueA, valueB;

        switch (sortField) {
            case "date":
                valueA = new Date(a.date);
                valueB = new Date(b.date);
                break;
            case "city":
                valueA = a.station.city.toLowerCase();
                valueB = b.station.city.toLowerCase();
                break;
            case "train":
                valueA = a.train.name.toLowerCase();
                valueB = b.train.name.toLowerCase();
                break;
            default:
                valueA = new Date(a.date);
                valueB = new Date(b.date);
        }

        if (sortDirection === "asc") {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this route?")) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/route/${id}`, {
                    withCredentials: true,
                });
                setRoutes(routes.filter(route => route.id !== id));
            } catch (error) {
                alert("You must be authorized");
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">Routes</h1>
                    <Link href="/routes/add" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Add Route
                    </Link>
                </div>

                <input
                    type="text"
                    placeholder="Search by train name or station city"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-md text-black"
                />

                <div className="mb-4">
                    <button
                        onClick={() => { setSortField("date"); setSortDirection(sortDirection === "asc" ? "desc" : "asc"); }}
                        className={`mr-2 p-2 rounded-md ${sortField === "date" ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-200 hover:bg-orange-300"}`}
                    >
                        Sort by Date
                    </button>
                    <button
                        onClick={() => { setSortField("city"); setSortDirection(sortDirection === "asc" ? "desc" : "asc"); }}
                        className={`mr-2 p-2 rounded-md ${sortField === "city" ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-200 hover:bg-orange-300"}`}
                    >
                        Sort by City
                    </button>
                    <button
                        onClick={() => { setSortField("train"); setSortDirection(sortDirection === "asc" ? "desc" : "asc"); }}
                        className={`p-2 rounded-md ${sortField === "train" ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-200 hover:bg-orange-300"}`}
                    >
                        Sort by Train
                    </button>
                </div>

                <table className="w-full bg-white rounded-lg shadow-md">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 text-left text-black">Train</th>
                        <th className="p-2 text-left text-black">Station</th>
                        <th className="p-2 text-left text-black">Date</th>
                        <th className="p-2 text-black">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedRoutes.map(route => (
                        <tr key={route.id} className="border-t">
                            <td className="p-2 text-black">{route.train.name}</td>
                            <td className="p-2 text-black">{route.station.city}</td>
                            <td className="p-2 text-black">{new Date(route.date).toLocaleDateString()}</td>
                            <td className="p-2 flex space-x-2">
                                <Link href={`/routes/edit/${route.id}`} className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(route.id)} className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
