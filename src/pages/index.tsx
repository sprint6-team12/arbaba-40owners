import { GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import CustomizedNoticeList from '@/components/pageComponents/NoticeList/CustomizedNoticeList';
import NoticeListView from '@/components/pageComponents/NoticeList/NoticeListView';
import SearchPage from '@/components/pageComponents/SearchPage/SearchPage';
import noticeAPI from '@/lib/api/noticeAPI';
import keywordDataState from '@/recoil/atoms/searchAtom';

export default function Home(data: NoticeListResponseData) {
  const keyword = useRecoilValue(keywordDataState);
  const isSearchData = keyword !== '';

  if (isSearchData) return <SearchPage />;

  return (
    <main>
      <CustomizedNoticeList />
      <NoticeListView initialData={data} title={'전체 공고'} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await noticeAPI.getNoticeList({ offset: 0, limit: 6 });

  return {
    props: data,
  };
};
