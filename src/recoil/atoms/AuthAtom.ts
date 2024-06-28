import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface User {
  token: string | null;
  id: string | null;
  type: 'employee' | 'employer' | 'guest';
  isLogin: boolean;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    token: null,
    id: null,
    type: 'guest',
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
