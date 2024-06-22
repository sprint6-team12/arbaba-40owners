import { useState } from 'react';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <input
      value={searchInput}
      placeholder="가게 이름으로 찾아보세요"
      onChange={handleChangeInput}
    />
  );
}
