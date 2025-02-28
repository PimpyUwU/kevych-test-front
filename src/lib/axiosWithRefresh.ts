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
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            withCredentials: true,
        });
    } catch (error) {
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
            if (!isRefreshing) {
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    await refreshToken();


                    onTokenRefreshed();
                    isRefreshing = false;

                    return api(originalRequest);
                } catch (refreshError) {
                    // Handle failed refresh
                    isRefreshing = false;
                    return Promise.reject(refreshError);
                }
            } else {
                return new Promise((resolve) => {
                    subscribeToTokenRefresh(() => {
                        // Simply retry with the updated cookie
                        resolve(api(originalRequest));
                    });
                });
            }
        }

        return Promise.reject(error);
    }
);

export default api;