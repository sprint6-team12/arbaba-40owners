import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LOCATIONS } from '@/constants/data-locations';
import { IconCloseBlack } from '@/utils/Icons';
import DateSection from './DataSection';
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
        !FilterContainerRef.current.contains(event.target as Node)
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
      <button onClick={handleFilterClick}>버튼</button>
      {isFilterOpen && (
        <div ref={FilterContainerRef}>
          <div className="relative w-390px px-20px py-24px overflow-auto border border-solid border-gray20 rounded-10px bg-white">
            <div className="flex items-center justify-between pb-[18px]">
              <p className="font-bold text-[20px]">상세 필터</p>
              <button onClick={() => setIsFilterOpen(false)}>
                <IconCloseBlack />
              </button>
            </div>
            <LocationSection
              locations={LOCATIONS}
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
                className="text-custom-orange py-14px rounded-6px w-80px border border-custom-orange font-bold"
                onClick={handleResetClick}
              >
                초기화
              </button>
              <button
                className="bg-custom-orange text-white py-2 px-4 rounded-lg w-260px"
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
