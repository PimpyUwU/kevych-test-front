import React, { useState, useEffect } from 'react';
import { Train, TrainFormData } from '@/models/Train';
import { ErrorAlert } from '../ui/ErrorAlert';

interface TrainFormProps {
    initialValues?: Train | null;
    onSubmit: (data: TrainFormData) => Promise<void>;
    loading: boolean;
    error: string | null;
    submitButtonText: string;
    submittingText: string;
    onCancel?: () => void;
}

export const TrainForm: React.FC<TrainFormProps> = ({
                                                        initialValues,
                                                        onSubmit,
                                                        loading,
                                                        error,
                                                        submitButtonText,
                                                        submittingText,
                                                        onCancel
                                                    }) => {
    const [formData, setFormData] = useState<TrainFormData>({
        name: initialValues?.name || ''
    });

    // Update form when initialValues change
    useEffect(() => {
        if (initialValues) {
            setFormData({
                name: initialValues.name
            });
        }
    }, [initialValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
            {error && <ErrorAlert message={error} />}

            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-lg font-medium text-gray-700"
                >
                    Train Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-black"
                    placeholder="Enter train name"
                />
            </div>

            <div className={onCancel ? "flex justify-end space-x-4" : ""}>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className={`${onCancel ? "px-4 py-2 text-sm" : "w-full py-3"} bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading ? submittingText : submitButtonText}
                </button>
            </div>
        </form>
    );
};