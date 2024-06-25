import { Shop } from '@/types/ShopDetail';
import TitleButton from './TitleButton';
import ShopImageSection from './TitleImage';
import TitleInfo from './TitleInfo';

export default function ShopTitle({ shopData }: { shopData: Shop }) {
  return (
    <>
      <div className="overflow-hidden rounded-12px">
        <ShopImageSection imageUrl={shopData.imageUrl} name={shopData.name} />
      </div>
      <div className="flex flex-col justify-between pt-16px">
        <div className="flex flex-col gap-12px">
          <TitleInfo
            category={shopData.category}
            name={shopData.name}
            address1={shopData.address1}
            description={shopData.description}
          />
        </div>
        <div className="flex items-center justify-between mt-auto gap-8px tablet:mt-30px">
          <TitleButton />
        </div>
      </div>
    </>
  );
}
