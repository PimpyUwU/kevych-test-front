// components/RouteActions.tsx
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function RouteActions({ routeId, onDelete }) {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this route?")) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/route/${routeId}`, {
                    withCredentials: true,
                });
                onDelete(routeId); // Callback to remove the route from the list
            } catch (error) {
                alert("You must be authorized");
            }
        }
    };

    return (
        <div className="flex space-x-2">
            <Link href={`/routes/edit/${routeId}`} className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                Edit
            </Link>
            <button onClick={handleDelete} className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                Delete
            </button>
        </div>
    );
}
