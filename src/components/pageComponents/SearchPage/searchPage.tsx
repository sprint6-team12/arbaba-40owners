import { useRecoilValue } from 'recoil';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';
import NoticeListView from '../NoticeList/NoticeListView';

function SearchPage() {
  const searchValue = useRecoilValue(keywordDataState);
  const searchResults = useRecoilValue(searchResultState);

  return (
    <NoticeListView
      initialData={searchResults}
      title={
        <>
          <span className="text-red40">{searchValue}</span>에 대한 공고 목록
        </>
      }
    />
  );
}

export default SearchPage;
