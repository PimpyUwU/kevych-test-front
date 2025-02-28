import React from 'react';
import { StationFormData } from '@/models/Station';

interface StationFormProps {
    initialData: StationFormData;
    onSubmit: (formData: StationFormData) => Promise<void>;
    isSubmitting: boolean;
    buttonText: string;
    onCancel: () => void;
}

export const StationForm: React.FC<StationFormProps> = ({
                                                            initialData,
                                                            onSubmit,
                                                            isSubmitting,
                                                            buttonText,
                                                            onCancel
                                                        }) => {
    const [formData, setFormData] = React.useState<StationFormData>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    htmlFor="city"
                    className="block text-lg font-medium text-gray-700"
                >
                    Station City
                </label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-black"
                    placeholder="Enter station city"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {isSubmitting ? "Processing..." : buttonText}
                </button>
            </div>
        </form>
    );
};