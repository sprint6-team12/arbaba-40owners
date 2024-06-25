import { axiosInstance } from './axiosInstance';

interface PostShopData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

const shopAPI = {
  getShop: (shop_id: string) => {
    return axiosInstance.get(`shops/${shop_id}`);
  },
  postShop: ({
    name,
    category,
    address1,
    address2,
    description,
    imageUrl,
    originalHourlyPay,
  }: PostShopData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = {
      name,
      category,
      address1,
      address2,
      description,
      imageUrl,
      originalHourlyPay,
    };
    return axiosInstance.post(`/shops`, { body }, { headers });
  },
  putShop: (
    shop_id: string,
    {
      name,
      category,
      address1,
      address2,
      description,
      imageUrl,
      originalHourlyPay,
    }: PostShopData
  ) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = {
      name,
      category,
      address1,
      address2,
      description,
      imageUrl,
      originalHourlyPay,
    };
    return axiosInstance.put(`/shops/${shop_id}`, { body }, { headers });
  },
};
export default shopAPI;
