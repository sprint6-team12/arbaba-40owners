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

export async function getShopApply({
  shop_id,
  notice_id,
  offset,
  limit,
}: ShopApplyData) {
  const params = {
    offset,
    limit,
  };
  const response = await axiosInstance.get(
    `/shops/${shop_id}/notices/${notice_id}/applications`,
    { params }
  );
  return response.data;
}

export async function postShopApply({ shop_id, notice_id }: ShopApplyData) {
  const response = await axiosInstance.post(
    `/shops/${shop_id}/notices/${notice_id}/applications`,
    {}
  );
  return response.data;
}

export async function putShopApply(href: string, applyStatus: string) {
  const response = await axiosInstance.put(href, { status: applyStatus });
  return response.data;
}

export async function getUserApply({ user_id, offset, limit }: UserApplyData) {
  const params = {
    user_id,
    offset,
    limit,
  };
  const response = await axiosInstance.get(`/users/${user_id}/applications`, {
    params,
  });
  return response.data;
}

// const applicationAPI = {
//   getShopApply: async ({
//     shop_id,
//     notice_id,
//     offset,
//     limit,
//   }: ShopApplyData) => {
//     const params = {
//       offset,
//       limit,
//     };
//     try {
//       const response = await axiosInstance.get(
//         `/shops/${shop_id}/notices/${notice_id}/applications`,
//         { params }
//       );
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
//   postShopApply: async ({ shop_id, notice_id }: ShopApplyData) => {
//     const headers = {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     };
//     try {
//       const response = await axiosInstance.post(
//         `/shops/${shop_id}/notices/${notice_id}/applications`,
//         {},
//         { headers }
//       );
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
//   putShopApply: async (href: string, applyStatus: string) => {
//     const headers = {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     };
//     const body = { status: applyStatus };
//     try {
//       const response = await axiosInstance.put(href, body, { headers });
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
//   getUserApply: async ({ user_id, offset, limit }: UserApplyData) => {
//     const params = {
//       user_id,
//       offset,
//       limit,
//     };
//     const headers = {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     };
//     try {
//       const response = await axiosInstance.get(
//         `/users/${user_id}/applications`,
//         {
//           params,
//           headers,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
// };

// export default applicationAPI;
