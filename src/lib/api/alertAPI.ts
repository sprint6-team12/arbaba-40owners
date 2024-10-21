import { axiosInstance } from './axiosInstance';

interface GetAlertData {
  user_id: string;
  offset?: number;
  limit?: number;
  alert_id?: string;
}

export async function getAlerts({ user_id, offset, limit }: GetAlertData) {
  const params = {
    offset,
    limit,
  };
  const response = await axiosInstance.get(`/users/${user_id}/alerts`, {
    params,
  });
  return response.data;
}

export async function putAlerts({ user_id, alert_id }: GetAlertData) {
  const requestBody = {};
  const response = await axiosInstance.put(
    `/users/${user_id}/alerts/${alert_id}`,
    requestBody
  );
  return response.data;
}

// const alertAPI = {
//   getAlerts: async ({
//     user_id,
//     token = localStorage.getItem('token'),
//     offset,
//     limit,
//   }: GetAlertData) => {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     const params = {
//       offset,
//       limit,
//     };
//     try {
//       const response = await axiosInstance.get(`/users/${user_id}/alerts`, {
//         params,
//         headers,
//       });
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
//   putAlerts: async ({
//     user_id,
//     token = localStorage.getItem('token'),
//     alert_id,
//   }: GetAlertData) => {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     const requestBody = {};
//     try {
//       const response = await axiosInstance.put(
//         `/users/${user_id}/alerts/${alert_id}`,
//         requestBody,
//         {
//           headers,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
// };

// export default alertAPI;
