import { GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import CustomizedNoticeList from '@/components/pageComponents/NoticeList/CustomizedNoticeList';
import NoticeListView from '@/components/pageComponents/NoticeList/NoticeListView';
import SearchPage from '@/components/pageComponents/SearchPage/SearchPage';
import { useResetSearchOnHome } from '@/hooks/useResetSearchOnHome';
import noticeAPI from '@/lib/api/noticeAPI';
import keywordDataState from '@/recoil/atoms/searchAtom';

export default function Home(data: NoticeListResponseData) {
  const keyword = useRecoilValue(keywordDataState);
  const isSearchData = keyword !== '';
  useResetSearchOnHome(data);

  if (isSearchData) return <SearchPage />;

  return (
    <main>
      <CustomizedNoticeList />
      <NoticeListView initialData={data} title={'전체 공고'} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await noticeAPI.getNoticeList({ limit: 6 });

  return {
    props: data,
  };
};
