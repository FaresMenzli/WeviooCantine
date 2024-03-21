// apiService.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface CustomAxiosInstance extends AxiosInstance {
  authToken?: string;
}

const interceptor: CustomAxiosInstance = axios.create({
 
});

// Add a request interceptor
interceptor.interceptors.request.use(
  function (config) {
    // Get token from localStorage or wherever you store it
    const token = localStorage.getItem('token');

    // Add token to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default interceptor;
