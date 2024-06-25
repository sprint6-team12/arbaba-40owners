import axios from 'axios';
import { APIError } from './APIERROR';
import { axiosInstance } from './axiosInstance';

interface LoginData {
  email: string;
  password: string;
}

const authenticationAPI = {
  post: async (body: LoginData) => {
    try {
      const response = await axiosInstance.post(`/token`, body);
      return response.data; // 받아온 토큰 값;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        let errorMessage;
        switch (status) {
          case 400:
            errorMessage = '잘못된 형식의 요청';
            break;
          case 409:
            errorMessage = '존재하는 이메일';
            break;
          case 500:
            errorMessage = '서버 오류';
            break;
          default:
            errorMessage = `예상치 못한 오류: ${error.response?.statusText || '알 수 없는 오류'}`;
        }
        throw new APIError(errorMessage, status);
      } else {
        throw new Error('서버에서 네트워크가 오지 않습니다.');
      }
    }
    return;
  },
};

export default authenticationAPI;
