import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { INITIAL_NOTICE_DATA } from '@/constants/initialNoticeData';
import useNoticeList from '@/hooks/useNoticeList';
import { IconCloseBlack, IconSearch } from '@/lib/utils/Icons';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState(''); // 검색창에 입력된 값, 검색창에 보여주거나 api keyword에 전달
  const setKeyword = useSetRecoilState(keywordDataState); // 검색창에 입력된 값을 전역 상태로 만든다.
  const setSearchResult = useSetRecoilState(searchResultState); // api 함수로 반환된 결과를 전역 상태로 만든다
  const { handleSearch } = useNoticeList(INITIAL_NOTICE_DATA);

  // recoil atoms에 있는 전역상태 값 변경
  const setSearchAtoms = useCallback(
    (keyword: string, results: NoticeListResponseData) => {
      setKeyword(keyword);
      setSearchResult(results);
    },
    [setKeyword, setSearchResult]
  );

  // 검색 실행 함수
  const initiateSearch = async () => {
    const results = await handleSearch(searchInput);
    setSearchAtoms(searchInput, results);
  };

  // 검색 초기화 함수
  const resetSearchResult = async () => {
    // 검색어 없는 상태의 리스트를 받아옴
    const results = await handleSearch('');
    setSearchAtoms('', results);
    setSearchInput('');
  };

  // 검색창의 이벤트 감지
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  // 검색창의 키입력 감지
  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (event.key) {
      case 'Enter':
        initiateSearch();
        break;
      case 'Escape':
        resetSearchResult();
        break;
    }
  };

  return (
    <div className="relative flex items-center w-335px tablet:w-344px pc:w-450px">
      <IconSearch
        className="absolute w-[20px] h-[20px] ml-[15px]"
        aria-label="돋보기아이콘"
      />
      <input
        value={searchInput}
        placeholder="가게 이름으로 찾아보세요"
        onChange={handleChangeInput}
        onKeyDown={handleKeyPress}
        className="px-[32px] py-[8px] ml-8px rounded-[10px] bg-gray10 w-full"
      />
      {searchInput && (
        <IconCloseBlack
          className="absolute right-10px"
          onClick={() => resetSearchResult()}
        />
      )}
    </div>
  );
}
