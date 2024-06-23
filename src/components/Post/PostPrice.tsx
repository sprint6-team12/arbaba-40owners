// PostPrice.tsx

import percentageCalculator from '@/utils/percentageCalculator';
import GrayArrow from '/public/images/icon-arrow-up-gray.svg';
import RedArrow from '/public/images/icon-arrow-up-red.svg';

interface PostPriceProps {
  hourlyPay: number;
  originalHourlyPay: number;
  isClosed: boolean;
}

export default function PostPrice({
  hourlyPay,
  originalHourlyPay,
  isClosed,
}: PostPriceProps) {
  const percentage = percentageCalculator(hourlyPay, originalHourlyPay);

  return (
    <div className="flex flex-col gap-0px tablet:flex-row pc:flex-row">
      <div className="flex justify-between items-center mt-15px tablet:mt-8px pc:mt-0">
        <p
          className={`text-18px tablet:text-24px pc:text-24px font-[700] tablet:mr-9px pc:mr-9px ${
            isClosed ? 'text-gray-300' : ''
          }`}
        >
          {hourlyPay.toLocaleString()}원
        </p>
      </div>
      <div className="flex items-center bg-white tablet:mt-8px pc:mt-8px tablet:bg-red40 pc:bg-red40 tablet:border pc:border pc:rounded-20px tablet:rounded-20px tablet:p-12px pc:p-12px tablet:h-36px pc:h-36px border-red40">
        <p className="text-12px text-red40 font-[400] tablet:text-white pc:text-white">{`기존 시급보다 ${percentage}%`}</p>
        <RedArrow
          className="h-16px w-16px tablet:hidden pc:hidden"
          alt="활성화 화살표"
        />
        <GrayArrow
          className="h-16px w-16px hidden tablet:block pc:block"
          alt="비활성화 화살표"
        />
      </div>
    </div>
  );
}
