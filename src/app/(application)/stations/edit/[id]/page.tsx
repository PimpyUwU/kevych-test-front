"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { StationHeader } from '@/components/stations/StationHeader';
import { StationForm } from '@/components/stations/StationForm';
import { useStation } from '@/hooks/useStation';
import { StationFormData } from '@/models/Station';

export default function EditStationPage() {
    const router = useRouter();
    const params = useParams();
    const stationId = Number(params.id);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { station, loading, error: fetchError, updateStation } = useStation(stationId);

    const [formData, setFormData] = useState<StationFormData>({
        city: "",
    });

    useEffect(() => {
        if (station) {
            setFormData({
                city: station.city
            });
        }
    }, [station]);

    const handleSubmit = async (data: StationFormData) => {
        setIsSubmitting(true);
        setError(null);

        const result = await updateStation(data);

        if (result.success) {
            alert("Station updated successfully");
            router.push("/stations");
        } else {
            setError(result.error || "Error updating the station");
        }

        setIsSubmitting(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <p className="text-sm text-red-700">{fetchError}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <StationHeader
                    title="Edit Station"
                    description="Modify the details of the station"
                    backLink="/stations"
                    backLinkText="Back to Stations"
                />

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <StationForm
                    initialData={formData}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    buttonText="Save Changes"
                    onCancel={() => router.push("/stations")}
                />
            </div>
        </div>
    );
}