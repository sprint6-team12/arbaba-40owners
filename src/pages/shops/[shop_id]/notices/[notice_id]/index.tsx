import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  NoticeDetailListSection,
  NoticeDetailSection,
} from '@/components/pageComponents/NoticeDetail';
import { getNoticeList, getShopNotice } from '@/lib/api/noticeAPI';

// 모든 가능한 [shop_id]/notice/[notice_id] 경로를 생성
export async function getAllShopNoticeIds() {
  const { items } = await getNoticeList({});

  const paths = items.map(({ item }: { item: Notice }) => {
    if (!('shop' in item)) return;

    return {
      params: {
        shop_id: item.shop.item.id.toString(),
        notice_id: item.id.toString(),
      },
    };
  });

  return paths;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllShopNoticeIds();
  return {
    paths,
    fallback: 'blocking', // 필요한 경우, 요청 시 페이지를 생성
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getShopNotice({
    shop_id: params?.shop_id as string,
    notice_id: params?.notice_id as string,
  });

  return {
    props: {
      noticeData: data,
    },
    revalidate: 10,
  };
};

const Page = ({ noticeData }: { noticeData: NoticeItem }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const basicPageDivStyle =
    'p-12px mx-12px tablet:mx-32px pc:mx-auto min-w-[315px] max-w-[964px] min-h-[90vw] h-auto pb-80px tablet:pb-60px pc:pb-60px';

  return (
    <div className="flex-center bg-gray05">
      <div className={`flex flex-col ${basicPageDivStyle}`}>
        <NoticeDetailSection noticeData={noticeData} />
        <NoticeDetailListSection noticeData={noticeData.item} />
      </div>
    </div>
  );
};

export default Page;
