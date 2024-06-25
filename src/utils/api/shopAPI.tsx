import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface PostShopData {
  name?: string;
  category?: string;
  address1?: string;
  address2?: string;
  description?: string;
  imageUrl?: string;
  originalHourlyPay?: number;
}

const shopAPI = {
  getShop: async (shop_id: string) => {
    try {
      const response = await axiosInstance.get(`shops/${shop_id}`);
      return response.data;
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
  postShop: async (body: PostShopData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    try {
      const response = await axiosInstance.post(
        `/shops`,
        { body },
        { headers }
      );
      return response.data;
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
  putShop: async (shop_id: string, body: PostShopData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const response = await axiosInstance.put(
        `/shops/${shop_id}`,
        { body },
        { headers }
      );
      return response.data;
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
export default shopAPI;
