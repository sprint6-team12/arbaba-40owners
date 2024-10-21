import { User } from '@/recoil/atoms/AuthAtom';
import { axiosInstance } from './axiosInstance';

interface PostShopData {
  name?: string;
  category?: string;
  address1?: string;
  address2?: string;
  description?: string;
  imageUrl?: string;
  originalHourlyPay?: number;
}

export async function getShop(shop_id: string) {
  const response = await axiosInstance.get(`shops/${shop_id}`);
  return response.data;
}

export async function postShop(
  body: PostShopData,
  setAuthState: (update: (prevState: User) => User) => void
) {
  const response = await axiosInstance.post(`/shops`, body);
  const shopId = response?.data?.item?.id;
  const address = response?.data?.item?.address1;
  const DetailAddress = response?.data?.item?.address2;
  setAuthState((prevState: User) => ({
    ...prevState,
    shopId: shopId,
    isLogin: true,
    address: address,
    DetailAddress: DetailAddress,
  }));
  return response.data;
}

export async function putShop(shop_id: string, body: PostShopData) {
  const response = await axiosInstance.put(`/shops/${shop_id}`, body);
  return response.data;
}

// const shopAPI = {
//   getShop: async (shop_id: string) => {
//     try {
//       const response = await axiosInstance.get(`shops/${shop_id}`);
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
//   postShop: async (
//     body: PostShopData,
//     setAuthState: (update: (prevState: User) => User) => void
//   ) => {
//     const headers = {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     };
//     try {
//       const response = await axiosInstance.post(`/shops`, body, { headers });
//       const shopId = response?.data?.item?.id;
//       const address = response?.data?.item?.address1;
//       const DetailAddress = response?.data?.item?.address2;
//       setAuthState((prevState: User) => ({
//         ...prevState,
//         shopId: shopId,
//         isLogin: true,
//         address: address,
//         DetailAddress: DetailAddress,
//       }));
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
//   putShop: async (shop_id: string, body: PostShopData) => {
//     const headers = {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     };
//     try {
//       const response = await axiosInstance.put(`/shops/${shop_id}`, body, {
//         headers,
//       });
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
// };
// export default ;
