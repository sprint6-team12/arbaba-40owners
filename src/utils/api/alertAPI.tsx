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
        const status = error.response?.status || 500;
        const errorMessage = ErrorMessages[status] || ErrorMessages.default;
        throw new APIError(errorMessage, status);
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
      return response.data
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

export default alertAPI;
