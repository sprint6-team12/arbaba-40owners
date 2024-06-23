import { useState } from 'react';
import SearchIcon from '/public/images/icon-search.svg';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute w-[20px] h-[20px] ml-[15px]" />
      <input
        value={searchInput}
        placeholder="가게 이름으로 찾아보세요"
        onChange={handleChangeInput}
        className="px-[32px] py-[8px] ml-8px rounded-[10px] bg-gray10 w-335px tablet:w-344px pc:w-450px"
      />
    </div>
  );
}
