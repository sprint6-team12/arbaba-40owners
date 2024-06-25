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
  getShopApply: ({ shop_id, notice_id, offset, limit }: ShopApplyData) => {
    const params = {
      shop_id,
      notice_id,
      offset,
      limit,
    };
    return axiosInstance.get(
      `/shops/${shop_id}/notices/${notice_id}/application`,
      { params }
    );
  },
  postShopApply: ({ shop_id, notice_id }: ShopApplyData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = {
      shop_id,
      notice_id,
    };
    return axiosInstance.post(
      `/shop/${shop_id}/notices/${notice_id}/applications`,
      { body },
      { headers }
    );
  },
  putShopApply: ({ shop_id, notice_id, application_id }: ShopApplyData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = {
      shop_id,
      notice_id,
      application_id,
    };
    return axiosInstance.put(
      `/shop/${shop_id}/notices/${notice_id}/applications/${application_id}`,
      { body },
      { headers }
    );
  },
  getUserApply: ({ user_id, offset, limit }: UserApplyData) => {
    const params = {
      user_id,
      offset,
      limit,
    };
    return axiosInstance.get(`/users/${user_id}/application`, { params });
  },
};

export default applicationAPI;
