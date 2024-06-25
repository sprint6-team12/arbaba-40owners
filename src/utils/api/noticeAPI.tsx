import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface GetNoticeListData {
  offset: number;
  limit: number;
  address: string;
  keyword: string;
  startsAtGte: string;
  hourlyPayGte: number;
  sort: string;
}

interface GetShopNoticeListData {
  shops_id: string;
  offset: number;
  limit: number;
}

interface GetShopNoticeData {
  shops_id: string;
  notice_id: string;
}

interface ShopNoticeData {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}
const noticeAPI = {
  getNoticeList: async ({
    offset,
    limit,
    address,
    keyword,
    startsAtGte,
    hourlyPayGte,
    sort,
  }: GetNoticeListData) => {
    const params = {
      offset,
      limit,
      address,
      keyword,
      startsAtGte,
      hourlyPayGte,
      sort,
    };
    try {
      const response = await axiosInstance.get(`/notices`, { params });
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
  getShopNoticeList: async ({
    shops_id,
    offset,
    limit,
  }: GetShopNoticeListData) => {
    const params = {
      offset,
      limit,
    };
    try {
      const response = await axiosInstance.get(`/shops/${shops_id}/notices`, {
        params,
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
  getShopNotice: async ({ shops_id, notice_id }: GetShopNoticeData) => {
    try {
      const response = await axiosInstance.get(
        `/shops/${shops_id}/notices/${notice_id}`
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
  postShopNotice: async (shop_id: string, body: ShopNoticeData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const response = await axiosInstance.post(
        `/shops/${shop_id}/notices`,
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
        const status = error.response?.status || 500;
        const errorMessage = ErrorMessages[status] || ErrorMessages.default;
        throw new APIError(errorMessage, status);
      } else {
        throw new Error('서버에서 네트워크가 오지 않습니다.');
      }
    }
  },
};

export default noticeAPI;
