// src/state/authState.ts
import { atom } from 'recoil';

interface User {
  token: string | null;
  id: string | null;
  type: string | null;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    token: null,
    id: null,
    type: null,
  },
});
