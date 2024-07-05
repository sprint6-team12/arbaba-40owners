import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api/6-12/the-julge',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

export default axiosInstance;
