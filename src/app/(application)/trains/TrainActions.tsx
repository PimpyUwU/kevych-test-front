"use client";
import { useState } from "react";
import Link from "next/link";

export default function TrainActions({ trainId}) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this train?")) {
            setIsDeleting(true);
            try {
                // We would implement the actual delete operation here
                // This would require authentication and proper API call
                alert("Delete functionality requires authentication");
            } catch (error) {
                console.error("Error deleting train:", error);
                alert("Failed to delete train");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="flex space-x-2">
            <Link href={`/trains/${trainId}/edit`}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors duration-200">
                Edit
            </Link>
            <Link href={`/trains/${trainId}/routes`}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200">
                Routes
            </Link>
            <button
                className={`px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    );
}