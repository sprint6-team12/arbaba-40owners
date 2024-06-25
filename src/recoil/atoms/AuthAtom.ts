import { atom } from 'recoil';

const authTokenState = atom<string | null>({
  key: 'authTokenState',
  default: null,
});

export default authTokenState;
