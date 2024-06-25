import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface LoginData {
  email: string;
  password: string;
}

const authenticationAPI = {
  postToken: async (body: LoginData) => {
    try {
      const response = await axiosInstance.post(`/token`, body);
      return response.data; // 받아온 토큰 값
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          const errorMessage =
            data.message || ErrorMessages[status] || ErrorMessages.default;
          throw new APIError(errorMessage, status);
        } else {
          // 서버 응답이 없는 경우 (네트워크 오류 등)
          throw new Error('서버에서 응답을 받아오지 못했습니다.');
        }
      } else {
        throw new Error('서버에서 네트워크가 오지 않습니다.');
      }
    }
  },
};
export default authenticationAPI;
