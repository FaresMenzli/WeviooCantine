// apiService.ts

import axios, { AxiosInstance} from 'axios';

interface CustomAxiosInstance extends AxiosInstance {
  authToken?: string;
}

const interceptor: CustomAxiosInstance = axios.create({
 
});

interceptor.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default interceptor;
