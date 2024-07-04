import { atom } from 'recoil';
import { INITIAL_NOTICE_DATA } from '@/constants/initialNoticeData';

const searchResultState = atom<NoticeListResponseData>({
  key: 'searchResultState',
  default: INITIAL_NOTICE_DATA,
});

export default searchResultState;
