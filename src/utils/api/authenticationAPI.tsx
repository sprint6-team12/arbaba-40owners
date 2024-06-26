import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface LoginData {
  email: string;
  password: string;
}

const authenticationAPI = {
  post: async (body: LoginData) => {
    try {
      const response = await axiosInstance.post(`/token`, body);
      return response.data; // 받아온 토큰 값
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const errorMessage = ErrorMessages[status] || ErrorMessages.default;
        alert(errorMessage);
        throw new APIError(errorMessage, status);
      } else {
        throw new Error('서버에서 네트워크가 오지 않습니다.');
      }
    }
  },
};
export default authenticationAPI;
