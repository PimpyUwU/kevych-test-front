"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/trains/PageHeader";
import { TrainForm } from "@/components/trains/TrainForm";
import { useTrainById } from "@/hooks/useTrainById";
import { useUpdateTrain } from "@/hooks/useUpdateTrain";
import { TrainFormData } from "@/models/Train";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorAlert } from "@/components/ui/ErrorAlert";

export default function EditTrainPage() {
    const params = useParams();
    const router = useRouter();
    const id = typeof params.id === 'string' ? parseInt(params.id, 10) : null;

    const { train, loading: fetchLoading, error: fetchError } = useTrainById(id);
    const { updateTrain, loading: updateLoading, error: updateError } = useUpdateTrain();

    const handleSubmit = async (formData: TrainFormData) => {
        if (!id) return;

        const success = await updateTrain(id, formData);
        if (success) {
            alert("Train updated successfully");
            router.push("/trains");
        }
    };

    const handleCancel = () => {
        router.push("/trains");
    };

    if (fetchLoading) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <PageHeader
                        title="Edit Train"
                        subtitle="Loading train details..."
                        backUrl="/trains"
                        backText="Back to Trains"
                    />
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <PageHeader
                        title="Edit Train"
                        subtitle="Error loading train"
                        backUrl="/trains"
                        backText="Back to Trains"
                    />
                    <ErrorAlert message={fetchError} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <PageHeader
                    title="Edit Train"
                    subtitle="Modify the details of the train"
                    backUrl="/trains"
                    backText="Back to Trains"
                />

                <TrainForm
                    initialValues={train}
                    onSubmit={handleSubmit}
                    loading={updateLoading}
                    error={updateError}
                    submitButtonText="Save Changes"
                    submittingText="Saving..."
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}