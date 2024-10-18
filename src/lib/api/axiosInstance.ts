import axios from 'axios';
import { handleAxiosError } from './ApiError';

export const axiosInstance = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api/06-12/the-julge',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await localStorage.getItem('accessToken');
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
    return newConfig;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const handledError = handleAxiosError(error);
    return Promise.reject(handledError);
  }
);
export default axiosInstance;
