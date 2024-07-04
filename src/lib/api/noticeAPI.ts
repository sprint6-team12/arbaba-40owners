import { handleAxiosError } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface GetNoticeListData {
  offset?: number;
  limit?: number;
  address?: string | null;
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: string;
}

interface GetShopNoticeListData {
  shop_id: string;
  offset: number;
  limit: number;
}

export interface GetShopNoticeData {
  shop_id: string;
  notice_id: string;
  token?: string;
}

export interface ShopNoticeData {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description?: string;
}
const noticeAPI = {
  getNoticeList: async (params: GetNoticeListData | URLSearchParams) => {
    try {
      const config = {
        params:
          params instanceof URLSearchParams
            ? Object.fromEntries(params.entries())
            : params,
      };
      const response = await axiosInstance.get(`/notices`, config);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  getShopNoticeList: async (shop_id: string, params: GetShopNoticeListData) => {
    try {
      const response = await axiosInstance.get(`/shops/${shop_id}/notices`, {
        params,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  getShopNotice: async ({ shop_id, notice_id, token }: GetShopNoticeData) => {
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
    };
    try {
      const response = await axiosInstance.get(
        `/shops/${shop_id}/notices/${notice_id}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  postShopNotice: async (shop_id: string, body: ShopNoticeData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const response = await axiosInstance.post(
        `/shops/${shop_id}/notices`,
        body,
        { headers }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  putShopNotice: async (
    shop_id: string,
    notice_id: string,
    body: ShopNoticeData
  ) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const response = await axiosInstance.put(
        `/shops/${shop_id}/notices/${notice_id}`,
        body,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default noticeAPI;
