import { handleAxiosError } from './ApiError';
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
      offset,
      limit,
    };
    try {
      const response = await axiosInstance.get(
        `/shops/${shop_id}/notices/${notice_id}/applications`,
        { params }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  postShopApply: async ({ shop_id, notice_id }: ShopApplyData) => {
    try {
      const response = await axiosInstance.post(
        `/shops/${shop_id}/notices/${notice_id}/applications`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  putShopApply: async (href: string, applyStatus: string) => {
    const body = { status: applyStatus };
    try {
      const response = await axiosInstance.put(href, body);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  getUserApply: async ({ user_id, offset, limit }: UserApplyData) => {
    const params = {
      user_id,
      offset,
      limit,
    };
    try {
      const response = await axiosInstance.get(
        `/users/${user_id}/applications`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default applicationAPI;
