import { User } from '@/recoil/atoms/AuthAtom';
import fetchInstance from './fetchInstance';

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
  const response = await fetchInstance.get(`/users/${user_id}`);

  if (type == 'employer') {
    const shopId = response?.item?.shop?.item?.id;
    const address = response?.item?.shop?.item?.address1;
    const DetailAddress = response?.item?.shop?.item?.address2;
    setAuthState((prevState: User) => ({
      ...prevState,
      shopId: shopId,
      isLogin: true,
      address: address,
      DetailAddress: DetailAddress,
    }));
  } else if (type === 'employee') {
    const address = response?.item?.address;
    const userName = response?.item?.name;
    if (address) {
      setAuthState((prevState: User) => ({
        ...prevState,
        isLogin: true,
        address: address,
        userName: userName,
      }));
    }
  }
  return response;
}

export async function postUserData(body: UserInput) {
  const response = await fetchInstance.post(`/users`, body);
  return response;
}

export async function putUserData(
  user_id: string,
  body: UserInfo,
  setAuthState: (update: (prevState: User) => User) => void
) {
  const response = await fetchInstance.put(`/users/${user_id}`, body);
  const userName = response?.item?.name;
  const address = response?.item?.address1;
  setAuthState((prevState: User) => ({
    ...prevState,
    userName: userName,
    isLogin: true,
    address: address,
  }));
  return response;
}
