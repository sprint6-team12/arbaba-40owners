import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface GetAlertData {
  user_id: string;
  token?: string | null;
  offset?: number;
  limit?: number;
  alert_id?: string;
}

const alertAPI = {
  getAlerts: async ({
    user_id,
    token = localStorage.getItem('token'),
    offset,
    limit,
  }: GetAlertData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const params = {
      offset,
      limit,
    };
    try {
      const response = await axiosInstance.get(`/users/${user_id}/alerts`, {
        params,
        headers,
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
  putAlerts: async ({
    user_id,
    token = localStorage.getItem('token'),
    alert_id,
  }: GetAlertData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const requestBody = {};
    try {
      const response = await axiosInstance.put(
        `/users/${user_id}/alerts/${alert_id}`,
        requestBody,
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

export default alertAPI;
