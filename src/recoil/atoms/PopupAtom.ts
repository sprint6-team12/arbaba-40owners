import { atom } from 'recoil';

export type PopupDataType = {
  id: string;
  message: string;
  duration?: number;
  onClose: () => void;
};

const popupsDataState = atom<PopupDataType[]>({
  key: 'popupsDataState',
  default: [],
});

export default popupsDataState;
