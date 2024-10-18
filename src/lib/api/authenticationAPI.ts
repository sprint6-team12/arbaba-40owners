import { User } from '@/recoil/atoms/AuthAtom';
import { axiosInstance } from './axiosInstance';

interface LoginData {
  email: string;
  password: string;
}

export async function postToken(
  body: LoginData,
  setAuthState: (value: User | ((prevState: User) => User)) => void
) {
  const response = await axiosInstance.post(`/token`, body);
  const { token, user } = response.data.item;
  const userId = user.item.id;
  const userType = user.item.type;
  localStorage.setItem('token', token);

  if (token && userId) {
    setAuthState((prevState: User) => ({
      ...prevState,
      token: token,
      userId: userId,
      type: userType,
      isLogin: true,
    }));
  }
  return response.data;
}

// const authenticationAPI = {
//   postToken: async (
//     body: LoginData,
//     setAuthState: (value: User | ((prevState: User) => User)) => void
//   ) => {
//     try {
//       const response = await axiosInstance.post(`/token`, body);
//       const { token, user } = response.data.item;
//       const userId = user.item.id;
//       const userType = user.item.type;
//       localStorage.setItem('token', token);

//       if (token && userId) {
//         setAuthState((prevState: User) => ({
//           ...prevState,
//           token: token,
//           userId: userId,
//           type: userType,
//           isLogin: true,
//         }));
//       }
//       return response.data;
//     } catch (error) {
//       handleAxiosError(error);
//     }
//   },
// };

// export default authenticationAPI;
