import { Shops } from '@/types/ShopDetail';
import TitleButton from './TitleButton';
import ShopImageSection from './TitleImage';
import TitleInfo from './TitleInfo';

export default function ShopTitle({ shopData }: { shopData: Shops }) {
  return (
    <>
      <ShopImageSection imageUrl={shopData.imageUrl} name={shopData.name}/>
      <div className="flex flex-col justify-between pt-8px w-346px h-348px">
        <div className="flex flex-col gap-12px">
          <TitleInfo
            category={shopData.category}
            name={shopData.name}
            address1={shopData.address1}
            description={shopData.description}
          />
        </div>
        <div className="flex items-center justify-between gap-8px">
          <TitleButton />
        </div>
      </div>
    </>
  );
}
