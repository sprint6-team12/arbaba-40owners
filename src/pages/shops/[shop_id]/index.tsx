import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NoticesList from '@/components/pageComponents/ShopDetail/NoticesList';
import ShopHeaderSection from '@/components/pageComponents/ShopDetail/ShopHeader/ShopHeaderSection';
import { useAuth } from '@/hooks/useAuth';
import { getShopNoticeList } from '@/lib/api/noticeAPI';
import { getShop } from '@/lib/api/shopAPI';
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
      const shopResponse = await getShop(shopId);
      shopData = shopResponse.item ?? null;

      const noticesResponse = await getShopNoticeList(shopId, {
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
  const { token, userId, type, isLogin, shopId } = useRecoilValue(userState);
  const { setUser } = useAuth();
  const router = useRouter();
  const { shop_id } = router.query;

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 해주세요.');
      router.push('/');
      return;
    }
    if (type !== 'employer') {
      alert('권한이 없습니다.');
      router.push('/');
      return;
    }
    if (shop_id !== shopId) {
      alert('내 가게가 아닙니다.');
      router.push('/');
      return;
    }
    if (!token || !userId) {
      alert('로그인을 다시 해주세요.');
      setUser(null, null, null, 'guest', false, '', '', '');
      router.push('/');
      return;
    }
  }, [isLogin, type, token, userId, router, shopId, shop_id, setUser]);

  return (
    <div className="flex flex-col w-full">
      <ShopHeaderSection title="내 가게" shopData={shopData} />
      {noticesData && shopData && (
        <NoticesList noticesData={noticesData} shopData={shopData} />
      )}
    </div>
  );
}
