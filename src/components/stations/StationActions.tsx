import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { StationActionProps } from '@/models/Station';

const StationActions: React.FC<StationActionProps> = ({
                                                          stationId,
                                                          onDelete,
                                                      }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this station?")) {
            setIsDeleting(true);
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/station/${stationId}`, {
                    withCredentials: true,
                });
                alert("Station deleted successfully");
                onDelete(stationId);
            } catch (error) {
                alert("You must be authorized");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="flex space-x-2">
            <Link
                href={`/stations/edit/${stationId}`}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors duration-200"
            >
                Edit
            </Link>
            <Link
                href={`/routes?station_id=${stationId}`}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200"
            >
                Routes
            </Link>
            <button
                className={`px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200 ${
                    isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? "Deleting..." : "Delete"}
            </button>
        </div>
    );
};

export default StationActions;