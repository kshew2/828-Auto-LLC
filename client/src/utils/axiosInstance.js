// filepath: c:\Users\khalil\source\repos\828-auto-llc\client\src\utils\axiosInstance.js
import axios from 'axios';
import getBaseUrl from './baseURL';
import { auth } from '../firebase/firebase.config';

const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Single request interceptor to attach the Firebase token
axiosInstance.interceptors.request.use(
    async (config) => {
        console.log('Current user:', auth.currentUser);
        if (auth.currentUser) {
            const token = await auth.currentUser.getIdToken();
            console.log('Attaching token:', token);
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('No currentUser. Token not attached.');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;