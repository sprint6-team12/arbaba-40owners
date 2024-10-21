import { User } from '@/recoil/atoms/AuthAtom';
import { axiosInstance } from './axiosInstance';

interface UserInput {
  email: string;
  password: string;
  type?: string;
}

export interface UserInfo {
  name: string;
  phone: string;
  address?: string;
  bio?: string;
}

export async function getUserData(
  user_id: string,
  type: string,
  setAuthState: (update: (prevState: User) => User) => void
) {
  const response = await axiosInstance.get(`/users/${user_id}`);

  if (type == 'employer') {
    const shopId = response?.data?.item?.shop?.item?.id;
    const address = response?.data?.item?.shop?.item?.address1;
    const DetailAddress = response?.data?.item?.shop?.item?.address2;
    setAuthState((prevState: User) => ({
      ...prevState,
      shopId: shopId,
      isLogin: true,
      address: address,
      DetailAddress: DetailAddress,
    }));
  } else if (type === 'employee') {
    const address = response?.data?.item?.address;
    const userName = response?.data?.item?.name;
    if (address) {
      setAuthState((prevState: User) => ({
        ...prevState,
        isLogin: true,
        address: address,
        userName: userName,
      }));
    }
  }
  return response.data;
}

export async function postUserData(body: UserInput) {
  const response = await axiosInstance.post(`/users`, body);
  return response.data;
}

export async function putUserData(
  user_id: string,
  body: UserInfo,
  setAuthState: (update: (prevState: User) => User) => void
) {
  const response = await axiosInstance.put(`/users/${user_id}`, body);
  const userName = response?.data?.item?.name;
  const address = response?.data?.item?.address1;
  setAuthState((prevState: User) => ({
    ...prevState,
    userName: userName,
    isLogin: true,
    address: address,
  }));
  return response.data;
}

// const userAPI = {
//   getUserData: async (
//     user_id: string,
//     type: string,
//     setAuthState: (update: (prevState: User) => User) => void
//   ) => {
//     try {
//       const response = await axiosInstance.get(`/users/${user_id}`);

//       if (type == 'employer') {
//         const shopId = response?.data?.item?.shop?.item?.id;
//         const address = response?.data?.item?.shop?.item?.address1;
//         const DetailAddress = response?.data?.item?.shop?.item?.address2;
//         setAuthState((prevState: User) => ({
//           ...prevState,
//           shopId: shopId,
//           isLogin: true,
//           address: address,
//           DetailAddress: DetailAddress,
//         }));
//       } else if (type === 'employee') {
//         const address = response?.data?.item?.address;
//         const userName = response?.data?.item?.name;
//         if (address) {
//           setAuthState((prevState: User) => ({
//             ...prevState,
//             isLogin: true,
//             address: address,
//             userName: userName,
//           }));
//         }
//       }
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
//   postUserData: async (body: UserInput) => {
//     try {
//       const response = await axiosInstance.post(`/users`, body);
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
//   putUserData: async (
//     user_id: string,
//     token = localStorage.getItem('token'),
//     body: UserInfo,
//     setAuthState: (update: (prevState: User) => User) => void
//   ) => {
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };
//       const response = await axiosInstance.put(`/users/${user_id}`, body, {
//         headers,
//       });
//       const userName = response?.data?.item?.name;
//       const address = response?.data?.item?.address1;
//       setAuthState((prevState: User) => ({
//         ...prevState,
//         userName: userName,
//         isLogin: true,
//         address: address,
//       }));
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
// };

// export default userAPI;
