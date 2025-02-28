import { useState } from 'react';
import api from '@/lib/axiosWithRefresh'

export const useDeleteTrain = (onSuccess?: (id: number) => void) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deleteTrain = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this train?')) {
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            await api.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/train/${id}`,
                { withCredentials: true }
            );

            if (onSuccess) {
                onSuccess(id);
            }
            return true;
        } catch (err: any) {
            console.error('Error deleting train:', err);
            setError(err.response?.data?.message || 'Failed to delete the train. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteTrain, loading, error };
};