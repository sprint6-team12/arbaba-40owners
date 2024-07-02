import axios from 'axios';
import { handleAxiosError } from '@/lib/api/ApiError';

type ApiRequestFunction = <T>(config?: Record<string, unknown>) => Promise<T>;

type ApiCategory = 'notice' | 'user' | 'shop' | 'application';
type ApiRequestList = Record<ApiCategory, Record<string, ApiRequestFunction>>;

const descriptionMap: Record<ApiCategory, string> = {
  notice: '공고',
  user: '사용자',
  shop: '가게',
  application: '지원',
};

const useApiLinksData = (links: Link[]) => {
  const apiRequestList: ApiRequestList = {
    notice: {},
    user: {},
    shop: {},
    application: {},
  };

  links.map(({ rel, description, method, href }) => {
    const index = (Object.keys(descriptionMap) as ApiCategory[]).find((key) =>
      description.includes(descriptionMap[key])
    );

    if (!index) return;

    apiRequestList[index][rel] = async <T>(config = {}) => {
      const combinedConfig = {
        baseURL: 'https://bootcamp-api.codeit.kr/',
        url: href,
        method: method.toLowerCase(),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: false,
        ...config,
      };

      try {
        const response = await axios.request<T>(combinedConfig);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
        throw error;
      }
    };
  });

  return apiRequestList;
};

export default useApiLinksData;
