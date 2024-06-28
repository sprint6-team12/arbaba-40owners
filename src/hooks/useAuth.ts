import { useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atoms/AuthAtom';

export const useAuth = () => {
  const setUserState = useSetRecoilState(userState);

  const setUser = (
    token: string | null,
    id: string | null,
    type: 'employee' | 'employer' | 'guest',
    isLogin: boolean
  ) => {
    setUserState({
      token,
      id,
      type,
      isLogin,
    });
  };

  return { setUser };
};
