import { useState, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance';

/**
 * Custom hook for manual/triggered API calls.
 * Returns { execute, data, loading, error, reset }.
 * 
 * Example usage:
 * const { execute, loading, error } = useAxios();
 * const handleSubmit = async (formData) => {
 *   try {
 *     const response = await execute({ url: '/api/submit', method: 'POST', data: formData });
 *     console.log('Success:', response);
 *   } catch (err) {
 *     console.error('Failed:', err);
 *   }
 * };
 */
const useAxios = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    const execute = useCallback(async (config) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance(config);
            setData(response.data);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { execute, data, loading, error, reset, setError };
};

export default useAxios;
