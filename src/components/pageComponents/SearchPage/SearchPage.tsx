import { useMemo } from 'react';
import { FaShopSlash } from 'react-icons/fa6';
import { RiLoader2Fill } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import NoticeListView from '@/components/pageComponents/NoticeList/NoticeListView';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';

function SearchPage() {
  const searchValue = useRecoilValue(keywordDataState);
  const searchResults = useRecoilValue(searchResultState);

  const hasResults = useMemo(() => {
    return (
      searchResults && searchResults.items && searchResults.items.length > 0
    );
  }, [searchResults]);

  const isSearchComplete = useMemo(() => {
    return searchResults !== null;
  }, [searchResults]);

  if (!isSearchComplete) {
    return (
      <RiLoader2Fill className="animate-spin w-28px h-28px mx-auto my-40px" />
    );
  }

  return (
    <>
      <NoticeListView
        key={searchValue}
        initialData={searchResults}
        title={
          <>
            <span className="text-red40">{searchValue}</span>에 대한 공고 목록
          </>
        }
      />
      {!hasResults && (
        <div className="mx-auto w-fit h-340px text-20px tablet:text-28px pc:text-30px">
          <FaShopSlash className="mx-auto mb-20px w-160px h-160px tablet:w-200px tablet:h-200px pc:w-240px pc:h-240px" />
          공고 목록이 없습니다.
        </div>
      )}
    </>
  );
}

export default SearchPage;
