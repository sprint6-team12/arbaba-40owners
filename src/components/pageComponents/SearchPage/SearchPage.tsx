import { useEffect, useState } from 'react';
import { RiLoader2Fill } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import NoticeListView from '@/components/pageComponents/NoticeList/NoticeListView';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';

function SearchPage() {
  const searchValue = useRecoilValue(keywordDataState);
  const searchResults = useRecoilValue(searchResultState);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  useEffect(() => {
    setIsSearchComplete(false);
  }, [searchValue]);

  useEffect(() => {
    if (
      searchResults &&
      searchResults.items &&
      searchResults.items.length > 0
    ) {
      setIsSearchComplete(true);
    }
  }, [searchResults]);

  if (!isSearchComplete) {
    return (
      <RiLoader2Fill className="animate-spin w-28px h-28px mx-auto my-40px" />
    );
  }

  return (
    <>
      <NoticeListView
        initialData={searchResults}
        title={
          <>
            <span className="text-red40">{searchValue}</span>에 대한 공고 목록
          </>
        }
      />
    </>
  );
}

export default SearchPage;
