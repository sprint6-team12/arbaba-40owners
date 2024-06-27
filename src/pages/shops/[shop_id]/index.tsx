import { GetServerSideProps } from 'next';
import NoticesList from '@/components/ShopDetail/NoticesList';
import ShopTitleSection from '@/components/ShopDetail/ShopHeader/ShopHeaderSection';
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

  return {
    props: {
      shopData,
      noticesData,
    },
  };
};

export default function ShopDetail({ shopData, noticesData }: ShopDetailProps) {
  return (
    <>
      <div className="w-full flex flex-col">
        <ShopTitleSection title="내 가게" shopData={shopData} />
        {shopData && (
          <NoticesList noticesData={noticesData} shopData={shopData} />
        )}
      </div>
    </>
  );
}
