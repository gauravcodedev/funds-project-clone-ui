import { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '../utils/axiosInstance';

/**
 * Custom hook for automatic data fetching on component mount.
 * Returns { data, loading, error, refetch }.
 * 
 * Example usage:
 * const { data, loading, error, refetch } = useFetch('/items');
 */
const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use a ref for the options object to avoid infinite loops if it's not memoized by the caller
    const optionsRef = useRef(options);
    optionsRef.current = options;

    const fetchData = useCallback(async () => {
        if (!url) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance({
                url,
                method: 'GET',
                ...optionsRef.current
            });
            setData(response.data);
        } catch (err) {
            // Extract error message with priority: API message > Network error > Generic
            let errorMessage = 'Error fetching data';
            
            if (err.response) {
                errorMessage = err.response?.data?.message || 
                             err.response?.data?.error || 
                             `Server error (${err.response.status})`;
            } else if (err.request) {
                if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
                    errorMessage = 'Request timeout. Please check your connection and try again.';
                } else if (err.message === 'Network Error' || !navigator.onLine) {
                    errorMessage = 'Network error. Please check your internet connection.';
                } else {
                    errorMessage = 'Unable to reach server. Please try again later.';
                }
            } else {
                errorMessage = err.message || errorMessage;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
