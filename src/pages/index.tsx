import { GetServerSideProps } from 'next';
import CustomizedNoticeList from '@/components/pageComponents/NoticeList/CustomizedNoticeList';
import NoticeListView from '@/components/pageComponents/NoticeList/NoticeListView';
import { useResetSearchOnHome } from '@/hooks/useResetSearchOnHome';
import noticeAPI from '@/lib/api/noticeAPI';

export default function Home(data: NoticeListResponseData) {
  useResetSearchOnHome(data);

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
