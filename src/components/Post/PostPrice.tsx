import percentageCalculator from '@/lib/utils/percentageCalculator';
import { IconGrayArrow, IconRedArrow } from '@/utils/Icons';

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
  const payColor = isClosed ? 'text-gray30' : 'text-black';
  const alertColor = isClosed ? 'text-gray30' : 'text-red40';
  const borderColor = isClosed ? 'bg-gray30' : 'bg-red40';

  return (
    <div className="flex flex-col gap-0px tablet:flex-row pc:flex-row">
      <div className="flex justify-between items-center mt-15px tablet:mt-8px pc:mt-0">
        <p
          className={`text-18px tablet:text-24px pc:text-24px font-[700] tablet:mr-9px pc:mr-9px ${payColor}`}
        >
          {hourlyPay.toLocaleString()}원
        </p>
      </div>
      <div
        className={`flex items-center bg-white tablet:mt-8px pc:mt-8px tablet:${borderColor} pc:${borderColor} tablet:border-none pc:border-none pc:rounded-20px tablet:rounded-20px tablet:p-12px pc:p-12px tablet:h-36px pc:h-36px`}
      >
        <p
          className={`text-12px ${alertColor} font-[400] tablet:text-white pc:text-white`}
        >{`기존 시급보다 ${percentage}%`}</p>{' '}
        {isClosed ? (
          <IconGrayArrow className="ml-4px" alt="비활성화 화살표" />
        ) : (
          <IconRedArrow className="ml-4px" alt="활성화 화살표" />
        )}
      </div>
    </div>
  );
}
