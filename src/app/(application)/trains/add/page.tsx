"use client";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/trains/PageHeader";
import { TrainForm } from "@/components/trains/TrainForm";
import { useAddTrain } from "@/hooks/useAddTrain";
import { TrainFormData } from "@/models/Train";

export default function AddTrainPage() {
    const { addTrain, loading, error } = useAddTrain();
    const router = useRouter();

    const handleSubmit = async (formData: TrainFormData) => {
        const success = await addTrain(formData);
        if (success) {
            alert("Train added successfully");
            router.push("/trains");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <PageHeader
                    title="Add New Train"
                    subtitle="Fill out the form to add a new train to the system"
                    backUrl="/trains"
                    backText="Back to Trains List"
                />

                <TrainForm
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    submitButtonText="Add Train"
                    submittingText="Adding..."
                />
            </div>
        </div>
    );
}