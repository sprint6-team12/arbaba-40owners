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
  postShopNotice: (shop_id: string, body: ShopNoticeData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return axiosInstance.post(
      `/shops/${shop_id}/notices`,
      { body },
      {
        headers,
      }
    );
  },
  putShopNotice: (shop_id: string, notice_id: string, body: string) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return axiosInstance.put(`/shops/${shop_id}/notices/${notice_id}`, body, {
      headers,
    });
  },
};

export default noticeAPI;
