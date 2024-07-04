import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import noticeAPI from '@/lib/api/noticeAPI';
import { IconCloseBlack, IconSearch } from '@/lib/utils/Icons';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const setKeyword = useSetRecoilState(keywordDataState);
  const setSearchResult = useSetRecoilState(searchResultState);

  const initiateSearch = async () => {
    const results = await noticeAPI.getNoticeList({
      keyword: searchInput,
      limit: 6,
    });
    setSearchResult(results);
  };

  const resetSearchResult = async () => {
    setSearchInput('');
    setKeyword('');
    const result = await noticeAPI.getNoticeList({
      limit: 6,
    });
    setSearchResult(result);
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
        setKeyword(searchInput);
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
