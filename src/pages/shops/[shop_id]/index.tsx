import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NoticesList from '@/components/pageComponents/ShopDetail/NoticesList';
import ShopHeaderSection from '@/components/pageComponents/ShopDetail/ShopHeader/ShopHeaderSection';
import { useAuth } from '@/hooks/useAuth';
import noticeAPI from '@/lib/api/noticeAPI';
import shopAPI from '@/lib/api/shopAPI';
import { userState } from '@/recoil/atoms/AuthAtom';

interface ShopDetailProps {
  shopData: Shop | null;
  noticesData: NoticeListResponseData | null;
  APIerror?: string | null;
}

export const getServerSideProps: GetServerSideProps<ShopDetailProps> = async (
  context
) => {
  const { shop_id } = context.query;
  const shopId = shop_id as string;

  let shopData: Shop | null = null;
  let noticesData: NoticeListResponseData | null = null;

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
  } catch (errors) {
    shopData = null;
    noticesData = null;
  }

  return {
    props: {
      shopData,
      noticesData,
    },
  };
};

export default function ShopDetail({ shopData, noticesData }: ShopDetailProps) {
  const { token, userId, type, isLogin } = useRecoilValue(userState);
  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 해주세요.');
      router.push('/');
      return;
    }
    if (type !== 'employer') {
      alert('내 가게가 아닙니다.');
      router.push('/');
      return;
    }
    if (!token || !userId) {
      alert('로그인을 다시 해주세요.');
      setUser(null, null, null, 'guest', false);
      router.push('/');
      return;
    }
  }, [isLogin, type, token, userId, router, setUser]);

  return (
    <div className="w-full flex flex-col">
      <ShopHeaderSection title="내 가게" shopData={shopData} />
      {noticesData && shopData && (
        <NoticesList noticesData={noticesData} shopData={shopData} />
      )}
    </div>
  );
}
