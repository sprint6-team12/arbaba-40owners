import axios from 'axios';
import { APIError } from './APIERROR';
import { axiosInstance } from './axiosInstance';

interface UserInput {
  email: string;
  password: string;
  type?: string;
}

interface UserInfo {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

const userAPI = {
  getUserData: async (user_id: string) => {
    try {
      const response = await axiosInstance.get(`/users/${user_id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        let errorMessage;
        switch (status) {
          case 404:
            errorMessage = '존재하지 않는 사용자';
            break;
          case 500:
            errorMessage = '서버 오류';
            break;
          default:
            errorMessage = `예상치 못힌 오류: ${error.response?.statusText || '알 수 없는 오류'}`;
        }
        throw new APIError(errorMessage, status);
      } else {
        throw new Error('서버에서 네트워크가 오지 않습니다.');
      }
    }
  },
  postUserData: async (body: UserInput) => {
    try {
      const response = await axiosInstance.post(`/users`, body);
      return response.data;
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
  },
  putUserData: async (
    user_id: string,
    token = localStorage.getItem('token'),
    body: UserInfo
  ) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.put(`/users/${user_id}`, body, {
        headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        let errorMessage;
        switch (status) {
          case 400:
            errorMessage = '요청 양식 오류';
            break;
          case 403:
            errorMessage = '권한 없음';
            break;
          case 404:
            errorMessage = '존재하지 않는 사용자';
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
  },
};

export default userAPI;
