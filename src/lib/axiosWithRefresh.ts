import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const subscribeToTokenRefresh = (callback: () => void) => {
    refreshSubscribers.push(callback);
};

const onTokenRefreshed = () => {
    refreshSubscribers.forEach((callback) => callback());
    refreshSubscribers = [];
};

const refreshToken = async (): Promise<void> => {
    try {
        await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            withCredentials: true,
        });

        console.log('Token refresh successful');
    } catch (error) {
        console.error('Token refresh failed:', error);
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log('Received 401 error, attempting to refresh token');
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    await refreshToken();
                    console.log('Token refreshed, retrying original request');

                    onTokenRefreshed();
                    isRefreshing = false;

                    return api(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed in interceptor:', refreshError);
                    isRefreshing = false;
                    return Promise.reject(refreshError);
                }
            } else {
                console.log('Token refresh already in progress, queuing request');
                return new Promise((resolve) => {
                    subscribeToTokenRefresh(() => {
                        console.log('Executing queued request after token refresh');
                        resolve(api(originalRequest));
                    });
                });
            }
        }

        return Promise.reject(error);
    }
);

export default api;