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
            const errorMessage = err.response?.data?.message || err.message || 'Error fetching data';
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
