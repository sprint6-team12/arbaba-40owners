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
  (config) => {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('token');
      const newConfig = { ...config };
      if (accessToken) {
        newConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      return newConfig;
    }
    return config;
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
