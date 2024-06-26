import { useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atoms/AuthAtom';

export const useAuth = () => {
  const setUserState = useSetRecoilState(userState);

  const setUser = (token: string, id: string, type: string) => {
    setUserState({
      token,
      id,
      type,
    });
  };

  return { setUser };
};
