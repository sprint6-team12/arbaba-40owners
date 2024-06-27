import { GetServerSideProps } from 'next';
import PostCard from '@/components/Post/PostCard';
import ShopNoData from '@/components/ShopDetail/ShopNoData';
import ShopTitle from '@/components/ShopDetail/ShopTitle/ShopTitle';
import { Notices, Shops } from '@/types/ShopDetail';
import noticeAPI from '@/utils/api/noticeAPI';
import shopAPI from '@/utils/api/shopAPI';

interface ShopDetailProps {
  shopData: Shops | null;
  noticesDatas: Notices | null;
}

export const getServerSideProps: GetServerSideProps<ShopDetailProps> = async (
  context
) => {
  const { shop_id } = context.query;
  const shopId = shop_id as string;

  let shopData: Shops | null = null;
  let noticesDatas: Notices | null = null;

  try {
    if (shopId) {
      const shopResponse = await shopAPI.getShop(shopId);
      shopData = shopResponse.item ?? null;

      const noticesResponse = await noticeAPI.getShopNoticeList(shopId, {
        shop_id: shopId,
        offset: 0,
        limit: 99,
      });
      noticesDatas = noticesResponse ?? null;
    }
  } catch (error) {
    // error
  }

  return {
    props: {
      shopData,
      noticesDatas,
    },
  };
};

export default function ShopDetail({
  shopData,
  noticesDatas,
}: ShopDetailProps) {
  // const [noticesData, setNoticesData] = useState<Notices | null>(noticesDatas);
  // const [offset, setOffset] = useState<number>(3);
  // const router = useRouter();

  // const observer = useRef<IntersectionObserver | null>(null);
  // const observerRef = useRef<HTMLDivElement | null>(null);

  // const { shop_id } = router.query;
  // const shop_id = '7367ccac-bcce-4203-9bb9-65098fffb05e';

  // const shopId = shop_id as string;

  // const fetchMoreNotices = async () => {
  //   if (!noticesData?.hasNext) return;

  //   console.log(`before: ${noticesData}`);

  //   try {
  //     const newNoticesData = await noticeAPI.getShopNoticeList(shopId, {
  //       shop_id: shopId,
  //       offset: offset,
  //       limit: 3,
  //     });
  //     setNoticesData((prevData) => ({
  //       ...newNoticesData,
  //       items: [...(prevData?.items || []), ...newNoticesData.items],
  //     }));
  //     setOffset((prev) => prev + 3);
  //   } catch (error) {
  //     // error
  //   }

  //   console.log(`after: ${noticesData}`);
  // };

  // useEffect(() => {
  //   if (!noticesData?.hasNext) return;
  //   if (observer.current) observer.current.disconnect();

  //   if (typeof IntersectionObserver === 'undefined') {
  //     // IntersectionObserver가 지원되지 않는 경우
  //     return;
  //   }

  //   const handleObserver = (entries: IntersectionObserverEntry[]) => {
  //     const target = entries[0];
  //     if (target.isIntersecting) {
  //       fetchMoreNotices();
  //     }
  //   };

  //   observer.current = new IntersectionObserver(handleObserver);

  //   if (observerRef.current) {
  //     observer.current.observe(observerRef.current);
  //   }

  //   return () => {
  //     if (observer.current) {
  //       observer.current.disconnect();
  //     }
  //   };
  // }, [noticesData?.hasNext]);

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
        {shopData && (
          <div className="bg-[#fafafa]">
            <div className="mx-auto w-full px-32px py-60px max-w-[1000px]">
              <h1 className="font-bold text-start text-28px mb-24px pt-40px">
                등록한 공고
              </h1>
              {!noticesDatas ? (
                <ShopNoData title="공고를 등록해보세요." text="공고 등록하기" />
              ) : (
                <div className="flex gap-32px">
                  <div className="grid grid-cols-2 gap-x-8px gap-y-12px my-0 mx-auto pc:gap-x-36px pc:gap-y-26px pc:grid-cols-3">
                    {noticesDatas.items.map((item) => (
                      <PostCard
                        key={item.item.id}
                        noticeData={item.item}
                        shopData={shopData}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* {noticesData?.hasNext && <div ref={observerRef}></div>} */}
    </>
  );
}
