import { atom } from 'recoil';

const searchResultState = atom<NoticeListResponseData>({
  key: 'searchResultState',
  default: {
    offset: 0,
    limit: 6,
    count: 0,
    hasNext: false,
    address: [],
    keyword: '',
    items: [],
    links: [],
  },
});

export default searchResultState;
