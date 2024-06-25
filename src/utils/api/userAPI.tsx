import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
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
        const errorMessage = ErrorMessages[status] || ErrorMessages.default;
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
        const errorMessage = ErrorMessages[status] || ErrorMessages.default;
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
        const errorMessage = ErrorMessages[status] || ErrorMessages.default;
        throw new APIError(errorMessage, status);
      } else {
        throw new Error('서버에서 네트워크가 오지 않습니다.');
      }
    }
  },
};

export default userAPI;
