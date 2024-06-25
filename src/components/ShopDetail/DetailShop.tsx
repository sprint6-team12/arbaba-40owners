import { Shop } from '@/types/ShopDetail';
import ShopTitle from './ShopTitle/ShopTitle';

export default function DetailShop({ shopData }: { shopData: Shop }) {
  return (
    <>
      <div className="flex justify-between gap-31px p-24px rounded-24px bg-red10 min-h-[358px] tablet:flex-col">
        <ShopTitle shopData={shopData} />
      </div>
      <div className="bg-gray10 flex "></div>
    </>
  );
}
