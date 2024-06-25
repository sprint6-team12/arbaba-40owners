import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface PostShopData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

const shopAPI = {
  getShop: async (shop_id: string) => {
    try {
      const response = await axiosInstance.get(`shops/${shop_id}`);
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
  postShop: async ({
    name,
    category,
    address1,
    address2,
    description,
    imageUrl,
    originalHourlyPay,
  }: PostShopData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = {
      name,
      category,
      address1,
      address2,
      description,
      imageUrl,
      originalHourlyPay,
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
        const status = error.response?.status || 500;
        const errorMessage = ErrorMessages[status] || ErrorMessages.default;
        throw new APIError(errorMessage, status);
      } else {
        throw new Error('서버에서 네트워크가 오지 않습니다.');
      }
    }
  },
  putShop: async (
    shop_id: string,
    {
      name,
      category,
      address1,
      address2,
      description,
      imageUrl,
      originalHourlyPay,
    }: PostShopData
  ) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = {
      name,
      category,
      address1,
      address2,
      description,
      imageUrl,
      originalHourlyPay,
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
        const status = error.response?.status || 500;
        const errorMessage = ErrorMessages[status] || ErrorMessages.default;
        throw new APIError(errorMessage, status);
      } else {
        throw new Error('서버에서 네트워크가 오지 않습니다.');
      }
    }
  },
};
export default shopAPI;
