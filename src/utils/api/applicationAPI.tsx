import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface ShopApplyData {
  shop_id: string;
  notice_id: string;
  application_id?: string;
  offset?: number;
  limit?: number;
}

interface UserApplyData {
  user_id: string;
  offset: number;
  limit: number;
}

const applicationAPI = {
  getShopApply: async ({
    shop_id,
    notice_id,
    offset,
    limit,
  }: ShopApplyData) => {
    const params = {
      shop_id,
      notice_id,
      offset,
      limit,
    };
    try {
      const response = await axiosInstance.get(
        `/shops/${shop_id}/notices/${notice_id}/application`,
        { params }
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
  postShopApply: async ({ shop_id, notice_id }: ShopApplyData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = {
      shop_id,
      notice_id,
    };
    try {
      const response = await axiosInstance.post(
        `/shop/${shop_id}/notices/${notice_id}/applications`,
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
  putShopApply: async({ shop_id, notice_id, application_id }: ShopApplyData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = {
      shop_id,
      notice_id,
      application_id,
    };
    try {
      const response = await axiosInstance.put(
        `/shop/${shop_id}/notices/${notice_id}/applications/${application_id}`,
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
  getUserApply: async ({ user_id, offset, limit }: UserApplyData) => {
    const params = {
      user_id,
      offset,
      limit,
    };
    try {
      const response = await axiosInstance.get(`/users/${user_id}/application`, { params });
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

export default applicationAPI;
