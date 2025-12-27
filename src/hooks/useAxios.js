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
            // Extract error message with priority: API message > Network error > Generic
            let errorMessage = 'An unexpected error occurred';
            
            if (err.response) {
                // Server responded with error status
                errorMessage = err.response?.data?.message || 
                             err.response?.data?.error || 
                             `Server error (${err.response.status})`;
            } else if (err.request) {
                // Request made but no response received
                if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
                    errorMessage = 'Request timeout. Please check your connection and try again.';
                } else if (err.message === 'Network Error' || !navigator.onLine) {
                    errorMessage = 'Network error. Please check your internet connection.';
                } else {
                    errorMessage = 'Unable to reach server. Please try again later.';
                }
            } else {
                // Error in request setup
                errorMessage = err.message || errorMessage;
            }
            
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { execute, data, loading, error, reset, setError };
};

export default useAxios;
