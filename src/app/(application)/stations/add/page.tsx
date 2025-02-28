"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StationHeader } from '@/components/stations/StationHeader';
import { StationForm } from '@/components/stations/StationForm';
import { useStation } from '@/hooks/useStation';
import { StationFormData } from '@/models/Station';

export default function AddStationPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { createStation } = useStation(null);

    const initialData: StationFormData = {
        city: ""
    };

    const handleSubmit = async (formData: StationFormData) => {
        setIsSubmitting(true);
        setError(null);

        const result = await createStation(formData);

        if (result.success) {
            alert("Station added successfully");
            router.push("/stations");
        } else {
            setError(result.error || "Failed to add the station. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <StationHeader
                    title="Add New Station"
                    description="Fill out the form to add a new station to the system"
                    backLink="/stations"
                    backLinkText="Back to Stations List"
                />

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-red-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <StationForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    buttonText="Add Station"
                    onCancel={() => router.push("/stations")}
                />
            </div>
        </div>
    );
}
