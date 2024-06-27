import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NoticesList from '@/components/ShopDetail/NoticesList';
import ShopHeaderSection from '@/components/ShopDetail/ShopHeader/ShopHeaderSection';
import { userState } from '@/recoil/atoms/AuthAtom';
import { Notices, Shops } from '@/types/ShopDetail';
import noticeAPI from '@/utils/api/noticeAPI';
import shopAPI from '@/utils/api/shopAPI';

interface ShopDetailProps {
  shopData: Shops | null;
  noticesData: Notices | null;
  APIerror?: string | null;
}

export const getServerSideProps: GetServerSideProps<ShopDetailProps> = async (
  context
) => {
  const { shop_id } = context.query;
  const shopId = shop_id as string;

  let shopData: Shops | null = null;
  let noticesData: Notices | null = null;
  let APIerror: string | null = null;

  try {
    if (shopId) {
      const shopResponse = await shopAPI.getShop(shopId);
      shopData = shopResponse.item ?? null;

      const noticesResponse = await noticeAPI.getShopNoticeList(shopId, {
        shop_id: shopId,
        offset: 0,
        limit: 99,
      });
      noticesData = noticesResponse ?? null;
    }
  } catch (error: any) {
    shopData = null;
    noticesData = null;
    APIerror = error.message || String(error);
  }

  return {
    props: {
      shopData,
      noticesData,
      APIerror,
    },
  };
};

export default function ShopDetail({
  shopData,
  noticesData,
  APIerror,
}: ShopDetailProps) {
  const { token, id, type, isLogin } = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 해주세요.');
      router.push('/');
      return;
    }
    if (type !== 'employer') {
      alert('내 가게가 아닙니다.');
      // 아니면 id값이랑 가게의 id값이 안맞으면 ?? 이경우에는 APIerror 보다 밑에 있어야할듯
      router.push('/');
      return;
    }
    if (!token || !id) {
      alert('로그인을 다시 해주세요.');
      // 여기에 setUser 초기화 함수 넣어야될듯
      router.push('/');
      return;
    }
    if (APIerror) {
      alert(APIerror);
      router.push('/');
      return;
    }
  }, [isLogin, type, token, id, APIerror, router]);

  return (
    <>
      {shopData && (
        <div className="w-full flex flex-col">
          <ShopHeaderSection title="내 가게" shopData={shopData} />
          {noticesData && (
            <NoticesList noticesData={noticesData} shopData={shopData} />
          )}
        </div>
      )}
    </>
  );
}
