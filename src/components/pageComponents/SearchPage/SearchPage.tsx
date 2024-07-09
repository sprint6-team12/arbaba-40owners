//SearchPage.tsx
import Image from 'next/image';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import Nothing from '@/../../public/images/arbaba-nothing.png';
import NoticeListView from '@/components/pageComponents/NoticeList/NoticeListView';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';

function SearchPage() {
  const searchValue = useRecoilValue(keywordDataState);
  const searchResults = useRecoilValue(searchResultState);

  const hasResults = useMemo(() => {
    return searchResults?.items?.length > 0;
  }, [searchResults]);

  if (!hasResults) {
    return (
      <div className="mx-auto w-fit h-340px text-20px tablet:text-28px pc:text-34px mb-80px flex-center flex-col">
        <Image src={Nothing} alt="검색결과없음" height={60} width={300} />
        <div>
          <span className="text-red40">{searchValue}</span>에 해당하는 목록이
          없습니다.
        </div>
      </div>
    );
  }

  return (
    <NoticeListView
      key={searchValue}
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
