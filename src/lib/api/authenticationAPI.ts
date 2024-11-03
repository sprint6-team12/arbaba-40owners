import { User } from '@/recoil/atoms/AuthAtom';
import fetchInstance from './fetchInstance';

interface LoginData {
  email: string;
  password: string;
}

export async function postToken(
  body: LoginData,
  setAuthState: (value: User | ((prevState: User) => User)) => void
) {
  const response = await fetchInstance.post(`/token`, body);
  const { token, user } = response.item;
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
  return response;
}
