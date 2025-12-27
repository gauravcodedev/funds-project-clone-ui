import axios from 'axios';

/**
 * Shared axios instance with base configuration and interceptors.
 * You can adjust the baseURL and add authorization logic here.
 */
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://naturally-profiles-domestic-wanted.trycloudflare.com',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor: attach tokens if needed
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle global errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login on unauthorized access
            console.warn('Unauthorized access - redirecting to login');
            localStorage.removeItem('token');
            localStorage.removeItem('profileFormData');
            // Only redirect if we're not already on the login page
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
        
        // Handle network errors
        if (!error.response) {
            if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                error.message = 'Request timeout. Please check your connection and try again.';
            } else if (error.message === 'Network Error' || navigator.onLine === false) {
                error.message = 'Network error. Please check your internet connection.';
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
