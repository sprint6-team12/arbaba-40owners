import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface GetNoticeListData {
  offset?: number;
  limit?: number;
  address?: string;
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

interface GetShopNoticeData {
  shop_id: string;
  notice_id: string;
}

interface ShopNoticeData {
  hourlyPay?: number;
  startsAt?: string;
  workhour?: number;
  description?: string;
}
const noticeAPI = {
  getNoticeList: async (params: GetNoticeListData) => {
    try {
      const response = await axiosInstance.get(`/notices`, { params });
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
  getShopNoticeList: async (shop_id: string, params: GetShopNoticeListData) => {
    try {
      const response = await axiosInstance.get(`/shops/${shop_id}/notices`, {
        params,
      });
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
  getShopNotice: async ({ shop_id, notice_id }: GetShopNoticeData) => {
    try {
      const response = await axiosInstance.get(
        `/shops/${shop_id}/notices/${notice_id}`
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
  postShopNotice: async (shops_id: string, body: ShopNoticeData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const response = await axiosInstance.post(
        `/shops/${shops_id}/notices`,
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
  putShopNotice: async (shop_id: string, notice_id: string, body: string) => {
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

export default noticeAPI;
