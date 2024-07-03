import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import noticeAPI from '@/lib/api/noticeAPI';
import { IconSearch } from '@/lib/utils/Icons';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const setKeyword = useSetRecoilState(keywordDataState);
  const setSearchResult = useSetRecoilState(searchResultState);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      const results = await noticeAPI.getNoticeList({
        keyword: searchInput,
        limit: 6,
      });
      setSearchResult(results);
      setKeyword(searchInput);
    }
  };

  return (
    <div className="relative flex items-center w-335px tablet:w-344px pc:w-450px">
      <IconSearch className="absolute w-[20px] h-[20px] ml-[15px]" />
      <input
        value={searchInput}
        placeholder="가게 이름으로 찾아보세요"
        onChange={handleChangeInput}
        onKeyDown={handleKeyPress}
        className="px-[32px] py-[8px] ml-8px rounded-[10px] bg-gray10 w-full"
      />
    </div>
  );
}
