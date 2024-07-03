import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface User {
  token: string | null;
  userId: string | null;
  shopId: string | null;
  type: 'employee' | 'employer' | 'guest';
  isLogin: boolean;
  address: string;
  DetailAddress:string;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    token: null,
    userId: null,
    shopId: null,
    type: 'guest',
    isLogin: false,
    address: '',
    DetailAddress: "",
  },
  effects_UNSTABLE: [persistAtom],
});
