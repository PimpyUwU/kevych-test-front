import axios from "axios"
import {Route} from '@/models/Route'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});


export async function fetchRoutes(): Promise<Route[]> {
    try {
        const response = await axiosInstance.get('/route');
        return response.data;
    } catch (error) {
        console.error('API error fetching routes:', error);
        throw error;
    }
}

export async function fetchRoute(id: number): Promise<Route> {
    try {
        const response = await axiosInstance.get(`/route/${id}`);
        return response.data;
    } catch (error) {
        console.error(`API error fetching route ${id}:`, error);
        throw error;
    }
}

export async function createRoute(routeData: Omit<Route, 'id'>): Promise<Route> {
    try {
        const response = await axiosInstance.post('/route', routeData);
        return response.data;
    } catch (error) {
        console.error('API error creating route:', error);
        throw error;
    }
}

export async function updateRoute(id: number, routeData: Partial<Route>): Promise<Route> {
    try {
        const response = await axiosInstance.put(`/route/${id}`, routeData);
        return response.data;
    } catch (error) {
        console.error(`API error updating route ${id}:`, error);
        throw error;
    }
}

export async function deleteRoute(id: number): Promise<void> {
    try {
        await axiosInstance.delete(`/route/${id}`);
    } catch (error) {
        console.error(`API error deleting route ${id}:`, error);
        throw error;
    }
}
