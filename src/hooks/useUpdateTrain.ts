import { useState } from 'react';
import api from '@/lib/axiosWithRefresh'
import { TrainFormData } from '@/models/Train';

export const useUpdateTrain = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateTrain = async (id: number, trainData: TrainFormData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.put(
                `${process.env.NEXT_PUBLIC_API_URL}/train/${id}`,
                trainData,
                { withCredentials: true }
            );

            if (response.status === 200) {
                setSuccess(true);
                return true;
            }
            return false;
        } catch (err: any) {
            console.error('Error updating train:', err);
            setError(err.response?.data?.message || 'Failed to update the train. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { updateTrain, loading, error, success };
};