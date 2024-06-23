import { axiosInstance } from '@/pages/api/axiosInstance';

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
  shops_id: string;
  offset?: number;
  limit?: number;
}

interface GetShopNoticeData {
  shops_id: string;
  notice_id: string;
}

const noticeAPI = {
  getNoticeList: ({
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
    return axiosInstance.get(`/notices`, { params });
  },
  getShopNoticeList: ({ shops_id, offset, limit }: GetShopNoticeListData) => {
    const params = {
      offset,
      limit,
    };
    return axiosInstance.get(`/shops/${shops_id}/notices`, {
      params,
    });
  },
  getShopNotice: ({ shops_id, notice_id }: GetShopNoticeData) => {
    return axiosInstance.get(`/shops/${shops_id}/notices/${notice_id}`);
  },
  post: () => {},
  put: () => {},
};

export default noticeAPI;
