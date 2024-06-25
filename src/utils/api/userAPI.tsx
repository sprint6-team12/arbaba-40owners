import axios from 'axios';
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

class APIError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

const userAPI = {
  getUserData: async (user_id: string) => {
    try {
      const response = await axiosInstance.get(`/users/${user_id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosError 타입으로 캐스팅
        throw new APIError(
          `Error fetching user data: ${error.response?.statusText}`,
          error.response?.status || 500
        );
      } else {
        throw new Error('Network error or server not responding');
      }
    }
  },
  postUserData: async (body: UserInput) => {
    try {
      const response = await axiosInstance.post(`/users`, body);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosError 타입으로 캐스팅
        throw new APIError(
          `Error posting user data: ${error.response?.statusText}`,
          error.response?.status || 500
        );
      } else {
        throw new Error('Network error or server not responding');
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
        throw new APIError(
          `Error updating user data: ${error.response?.statusText}`,
          error.response?.status || 500
        );
      } else {
        throw new Error('Network error or server not responding');
      }
    }
  },
};

export default userAPI;
