// src/lib/client.ts
import { createClient } from '@rivermountain/fetch-to-axios';
import { handleApiError } from './ApiError';

const fetchInstance = createClient({
  baseURL: 'https://bootcamp-api.codeit.kr/api/06-12/the-julge',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  },
  credentials: 'include',
});

// 요청 인터셉터 추가
fetchInstance.interceptors.request.push({
  onFulfilled: (config) => {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('token');
      const newConfig = { ...config };
      if (accessToken) {
        newConfig.headers = {
          ...newConfig.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      return newConfig;
    }
    return config;
  },
  onRejected: (error) => Promise.reject(error),
});

// 응답 인터셉터 추가
fetchInstance.interceptors.response.push({
  onFulfilled: (response) => response,
  onRejected: async (error) => {
    const handledError = handleApiError(error);
    return Promise.reject(handledError);
  },
});

export default fetchInstance;
