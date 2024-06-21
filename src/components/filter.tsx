import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import IconCloseBlack from '@/../public/images/icon-close-black.svg';
import { LOCATIONS } from '@/constants/data-locations';

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
          <div className="relative w-390px px-20px py-24px overflow-auto border border-solid border-gray200 rounded-10px bg-white">
            <div className="flex items-center justify-between pb-[18px]">
              <p className="font-bold text-[20px]">상세 필터</p>
              <button onClick={() => setIsFilterOpen(false)}>
                <IconCloseBlack />
              </button>
            </div>
            <div className="flex flex-col pb-18px gap-16px">
              <p>위치</p>
              <div className="p-36px border border-solid rounded-6px grid grid-cols-2 gap-32px overflow-y-scroll h-350px">
                {LOCATIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="text-[14px]"
                    onClick={() => handleLocationClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-8px">
              {selectedLocations.map((location) => (
                <div
                  key={location}
                  className="flex items-center bg-red100 text-custom-orange px-10px py-6px rounded-20px font-bold text-14px"
                >
                  {location}
                  <button
                    className="ml-2 text-custom-orange"
                    onClick={() => handleRemoveLocation(location)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="border-solid border-b-2 border-gray200 my-8px" />
            <div className="flex flex-col pb-18px gap-16px">
              <p>시작일</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy년 MM월 dd일 (eee)"
                locale="ko"
                customInput={
                  <input
                    type="text"
                    className="w-full px-4 border border-gray300 rounded-lg cursor-pointer py-16px"
                    readOnly
                  />
                }
              />
            </div>
            <div className="border-solid border-b-2 border-gray200 my-8px" />
            <div className="flex flex-col gap-16px">
              <p>금액</p>
              <div className="flex items-center gap-18px">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="입력"
                    className="w-180px py-16px px-20px border border-gray300 rounded-6px pr-12"
                    value={inputPrice}
                    onChange={handlePriceChange}
                  />
                  <span className="absolute transform -translate-y-1/2 right-4 top-1/2">
                    원
                  </span>
                </div>
                <p>이상부터</p>
              </div>
            </div>
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
