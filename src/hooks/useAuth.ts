import { useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atoms/AuthAtom';

export const useAuth = () => {
  const setUserState = useSetRecoilState(userState);

  const setUser = (
    token: string | null,
    userId: string | null,
    shopId: string | null,
    type: 'employee' | 'employer' | 'guest',
    isLogin: boolean
  ) => {
    setUserState({
      token,
      userId,
      shopId,
      type,
      isLogin,
    });
  };

  return { setUser };
};
