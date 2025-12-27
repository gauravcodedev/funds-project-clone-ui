import axios from 'axios';

/**
 * Shared axios instance with base configuration and interceptors.
 * You can adjust the baseURL and add authorization logic here.
 */
const axiosInstance = axios.create({
    baseURL: 'https://naturally-profiles-domestic-wanted.trycloudflare.com',
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
            // Logic for unauthorized access (e.g., redirect to login)
            console.warn('Unauthorized access - potential token expiry');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
