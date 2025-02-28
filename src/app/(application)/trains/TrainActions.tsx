"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function TrainActions({
                                         trainId,
                                         onDelete,
                                     }: {
    trainId: number;
    onDelete: (trainId: number) => void;
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this train?")) {
            setIsDeleting(true);
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/train/${trainId}`, {
                    withCredentials: true,
                });
                alert("Train deleted successfully");
                onDelete(trainId);
            } catch (error) {
                alert("You must be authorized");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="flex space-x-2">
            <Link href={`/trains/edit/${trainId}`} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors duration-200">
                Edit
            </Link>
            <Link href={`routes?train_id=${trainId}`} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200">
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
