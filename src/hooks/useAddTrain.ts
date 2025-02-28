import { useState } from 'react';
import api from '@/lib/axiosWithRefresh'
import { TrainFormData } from '@/models/Train';

export const useAddTrain = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const addTrain = async (trainData: TrainFormData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.post(
                `${process.env.NEXT_PUBLIC_API_URL}/train`,
                trainData,
                { withCredentials: true }
            );

            if (response.status === 201) {
                setSuccess(true);
                return true;
            }
            return false;
        } catch (err: any) {
            console.error('Error adding train:', err);
            setError(err.response?.data?.message || 'Failed to add the train. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { addTrain, loading, error, success };
};