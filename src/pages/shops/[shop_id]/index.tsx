import { GetServerSideProps } from 'next';
import { useCallback, useEffect, useRef, useState } from 'react';
import PostCard from '@/components/Post/PostCard';
import ShopNoData from '@/components/ShopDetail/ShopNoData';
import ShopTitle from '@/components/ShopDetail/ShopTitle/ShopTitle';
import { Notices, Shops } from '@/types/ShopDetail';
import noticeAPI from '@/utils/api/noticeAPI';
import shopAPI from '@/utils/api/shopAPI';

interface ShopDetailProps {
  shopData: Shops | null;
  noticesData: Notices | null;
}

export const getServerSideProps: GetServerSideProps<ShopDetailProps> = async (
  context
) => {
  const { shop_id } = context.query;
  const shopId = shop_id as string;

  let shopData: Shops | null = null;
  let noticesData: Notices | null = null;

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
  } catch (error) {
    // error
  }

  return {
    props: {
      shopData,
      noticesData,
    },
  };
};

const NOTICES_PER_PAGE = 6;

export default function ShopDetail({ shopData, noticesData }: ShopDetailProps) {
  const [currentNoticesPage, setCurrentNoticesPage] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);
  const noticesRef = useRef<HTMLDivElement | null>(null);

  const currentNoticesData =
    noticesData?.items.slice(0, currentNoticesPage * NOTICES_PER_PAGE) || [];

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setCurrentNoticesPage((prevPage) => prevPage + 1);
      }
    },
    []
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (noticesRef.current) {
      observer.current.observe(noticesRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [observerCallback, noticesRef.current]);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="mx-auto w-full my-20px px-32px py-60px max-w-[1000px]">
          <h1 className="font-bold text-start text-28px mb-24px">내 가게</h1>
          {!shopData ? (
            <ShopNoData
              title="내 가게를 소개하고 공고도 등록해 보세요."
              text="내 가게 등록하기"
            />
          ) : (
            <div className="flex flex-col items-start justify-start gap-0 p-24px rounded-24px bg-red10 min-h-[358px] pc:flex-row pc:gap-31px">
              <ShopTitle shopData={shopData} />
            </div>
          )}
        </div>
        <div className="bg-[#fafafa]">
          <div className="mx-auto w-full px-32px py-60px max-w-[1000px]">
            {shopData && currentNoticesData.length === 0 && (
              <ShopNoData title="공고를 등록해보세요." text="공고 등록하기" />
            )}
            {shopData && currentNoticesData.length !== 0 && (
              <>
                <h1 className="font-bold text-start text-28px mb-24px pt-40px">
                  등록한 공고
                </h1>
                <div className="flex gap-32px">
                  <div className="grid grid-cols-2 gap-x-8px gap-y-12px my-0 mx-auto pc:gap-x-36px pc:gap-y-26px pc:grid-cols-3">
                    {currentNoticesData.map((item) => (
                      <PostCard
                        key={item.item.id}
                        noticeData={item.item}
                        shopData={shopData}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div ref={noticesRef}></div>
      </div>
    </>
  );
}
