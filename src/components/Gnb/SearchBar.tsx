import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { INITIAL_NOTICE_DATA } from '@/constants/initialNoticeData';
import useNoticeList from '@/hooks/useNoticeList';
import { IconCloseBlack, IconSearch } from '@/lib/utils/Icons';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const setKeyword = useSetRecoilState(keywordDataState);
  const setSearchResult = useSetRecoilState(searchResultState);
  const { handleSearch } = useNoticeList(INITIAL_NOTICE_DATA);

  const setSearchAtoms = useCallback(
    (keyword: string, results: NoticeListResponseData) => {
      setKeyword(keyword);
      setSearchResult(results);
    },
    [setKeyword, setSearchResult]
  );

  const initiateSearch = async () => {
    const results = await handleSearch(searchInput);
    setSearchAtoms(searchInput, results);
  };

  const resetSearchResult = async () => {
    const results = await handleSearch('');
    setSearchAtoms('', results);
    setSearchInput('');
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };

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
          onClick={resetSearchResult}
        />
      )}
      {searchInput && (
        <IconCloseBlack
          className="absolute right-10px"
          onClick={resetSearchResult}
        />
      )}
    </div>
  );
}
