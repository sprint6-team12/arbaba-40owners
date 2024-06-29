import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { SHOP_LOCATIONS_ARRAY } from '@/types/ShopOption';
import DateSection from './DateSection';
import Divider from './Divider';
import LocationSection from './LocationSection';
import PriceSection from './PriceSection';

registerLocale('ko', ko);

export default function Filter() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [inputPrice, setInputPrice] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const FilterContainerRef = useRef<HTMLDivElement>(null);
  const ButtonRef = useRef<HTMLButtonElement>(null);

  const handleLocationClick = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleRemoveLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((item) => item !== location));
  };

  const Commas = (number: string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value.replace(/\D/g, '');
    const formattedPrice = Commas(price);
    setInputPrice(formattedPrice);
  };

  const handleResetClick = () => {
    setStartDate(new Date());
    setSelectedLocations([]);
    setInputPrice('');
  };

  const handleFilterClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        FilterContainerRef.current &&
        !FilterContainerRef.current.contains(event.target as Node) &&
        ButtonRef.current &&
        !ButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <button
        className="font-bold text-white px-10px h-30px rounded-5px bg-red30 text-14px mb-10px"
        ref={ButtonRef}
        onClick={handleFilterClick}
      >
        상세 필터{' '}
        {selectedLocations.length !== 0 && `(${selectedLocations.length})`}
      </button>
      {isFilterOpen && (
        <div ref={FilterContainerRef}>
          <div className="relative overflow-auto bg-white border border-solid w-390px px-20px py-24px border-gray20 rounded-10px">
            <div className="flex items-center justify-between pb-18px">
              <p className="font-bold text-20px">상세 필터</p>
              <button onClick={() => setIsFilterOpen(false)}>
                <IconCloseBlack />
              </button>
            </div>
            <LocationSection
              locations={SHOP_LOCATIONS_ARRAY}
              selectedLocations={selectedLocations}
              onLocationClick={handleLocationClick}
              onRemoveLocation={handleRemoveLocation}
            />
            <Divider />
            <DateSection startDate={startDate} setStartDate={setStartDate} />
            <Divider />
            <PriceSection
              inputPrice={inputPrice}
              onPriceChange={handlePriceChange}
            />
            <div className="flex justify-between mt-20px">
              <button
                className="font-bold border text-custom-orange py-14px rounded-6px w-80px border-custom-orange"
                onClick={handleResetClick}
              >
                초기화
              </button>
              <button
                className="px-4 py-2 text-white rounded-lg bg-custom-orange w-260px"
                onClick={() => {
                  /* 적용하기 기능 */
                }}
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
