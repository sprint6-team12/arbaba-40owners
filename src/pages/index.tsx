//index.tsx
import { GetServerSideProps } from 'next';
import { useEffect, useState, useTransition } from 'react';
import { useRecoilValue } from 'recoil';
import Loading from '@/components/pageComponents/Loading/Loading';
import CustomizedNoticeList from '@/components/pageComponents/NoticeList/CustomizedNoticeList';
import NoticeListView from '@/components/pageComponents/NoticeList/NoticeListView';
import SearchPage from '@/components/pageComponents/SearchPage/SearchPage';
import { useResetSearchOnHome } from '@/hooks/useResetSearchOnHome';
import noticeAPI from '@/lib/api/noticeAPI';
import keywordDataState from '@/recoil/atoms/searchAtom';

export default function Home(data: NoticeListResponseData) {
  const keyword = useRecoilValue(keywordDataState);
  const [isSearchData, setIsSearchData] = useState(false);
  const [isPending, startTransition] = useTransition();

  useResetSearchOnHome(data);

  useEffect(() => {
    startTransition(() => {
      setIsSearchData(keyword !== '');
    });
  }, [keyword]);

  if (isPending) return <Loading />;

  if (isSearchData) return <SearchPage />;

  return (
    <>
      <CustomizedNoticeList />
      <NoticeListView initialData={data} title={'전체 공고'} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await noticeAPI.getNoticeList({ limit: 6 });

  return {
    props: data,
  };
};
