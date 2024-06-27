import { atom } from 'recoil';

interface User {
  token: string | null;
  id: string | null;
  type: string | null;
  isLogin: boolean;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    token: null,
    id: null,
    type: null,
    isLogin: false,
  },
});
