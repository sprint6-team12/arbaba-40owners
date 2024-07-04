import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import NoticesList from '@/components/pageComponents/ShopDetail/NoticesList';
import ShopHeaderSection from '@/components/pageComponents/ShopDetail/ShopHeader/ShopHeaderSection';
import noticeAPI from '@/lib/api/noticeAPI';
import shopAPI from '@/lib/api/shopAPI';
import { userState } from '@/recoil/atoms/AuthAtom';

interface ShopDetailProps {
  APIerror?: string | null;
}

export const getServerSideProps: GetServerSideProps<
  ShopDetailProps
> = async () => {
  return {
    props: {
      APIerror: null,
    },
  };
};

export default function ShopDetail({ APIerror }: ShopDetailProps) {
  const { token, userId, type, isLogin, shopId } = useRecoilValue(userState);
  const router = useRouter();

  const [shopData, setShopData] = useState<Shop | null>(null);
  const [noticesData, setNoticesData] = useState<NoticeListResponseData | null>(
    null
  );

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
    if (!token || !userId || !shopId) {
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

    const fetchData = async () => {
      try {
        const shopResponse = await shopAPI.getShop(shopId);
        setShopData(shopResponse.item ?? null);

        const noticesResponse = await noticeAPI.getShopNoticeList(shopId, {
          shop_id: shopId,
          offset: 0,
          limit: 99,
        });
        setNoticesData(noticesResponse ?? null);
      } catch (error: any) {
        alert(error.message || String(error));
        router.push('/');
      }
    };

    fetchData();
  }, [isLogin, type, token, userId, shopId, APIerror, router]);

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
