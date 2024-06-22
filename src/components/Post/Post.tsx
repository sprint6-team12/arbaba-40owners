import Image from 'next/image';
import Link from 'next/link';
import ActiveClock from '/public/images/icon-clock.svg';
import InActiveClock from '/public/images/icon-clock-inactive.svg';
import ActiveLocation from '/public/images/icon-location.svg';
import InActiveLocation from '/public/images/icon-location-inactive.svg';
import percentageCalculator from '@/components/Post/percentageCalculator';
import formatTime from '@/components/Post/formatTime';
import Arrow from '/public/images/icon-arrow-up-bold.svg';

export interface PostCardProps {
  hourlyPay: number;
  startsAt: string;
  closed: boolean;
  workhour: number;
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
  href: string;
}

export default function Post({
  hourlyPay,
  startsAt,
  closed,
  workhour,
  name,
  address1,
  imageUrl,
  originalHourlyPay,
  href,
}: PostCardProps) {
  const isPassed = new Date() > new Date(startsAt);
  const isClosed = closed || isPassed;
  const percentage = percentageCalculator(hourlyPay, originalHourlyPay);

  const getClosedText = () => {
    if (closed) {
      return '마감 완료';
    }
    if (isPassed) {
      return '지난 공고';
    }
    return null;
  };

  return (
    <Link
      href={href}
      className={`flex flex-col justify-between w-[31.2rem] h-[34.8rem] bg-white rounded-[1.2rem] p-[1.6rem] border border-gray-200 ${isClosed ? 'pointer-events-none' : ''}`}
    >
      <div className="relative rounded-[1.2rem] overflow-hidden w-full h-[16rem]">
        <Image
          src={imageUrl}
          className={`rounded-[1.2rem] ${isClosed ? 'brightness-40' : ''}`}
          alt="가게 사진"
          fill
        />
        {isClosed && (
          <p className="text-[2.8rem] font-normal text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {getClosedText()}
          </p>
        )}
      </div>
      <h2 className={`text-[2rem] ${isClosed ? 'text-gray-300' : ''}`}>
        {name}
      </h2>
      <div className={'flex flex-col gap-[0.8rem] mt-[-0.5rem]'}>
        <div
          className={`flex items-center text-[1.4rem] text-gray-500 ${isClosed ? 'text-gray-300' : ''}`}
        >
          {isClosed ? (
            <InActiveClock
              aria-label="시간비활성화"
              className="w-30px h-20px"
            />
          ) : (
            <ActiveClock aria-label="시간활성화" className="w-30px h-20px" />
          )}
          <p className="">{formatTime(startsAt, workhour)}</p>
        </div>
        <div
          className={`flex items-center text-[1.4rem] text-gray-500 ${isClosed ? 'text-gray-300' : ''}`}
        >
          {isClosed ? (
            <InActiveLocation
              aria-label="장소활성화"
              className="w-30px h-20px"
            />
          ) : (
            <ActiveLocation
              aria-label="장소비활성화"
              className="w-30px h-20px"
            />
          )}
          <p>{address1}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p
          className={`text-[2.4rem] font-bold ${isClosed ? 'text-gray-300' : ''}`}
        >
          {hourlyPay.toLocaleString()}원
        </p>
        <div>
          <p>{`기존시급보다 ${percentage}%`}</p>
          <Arrow className="h-20px w-20px ml-2" alt="화살표" />
        </div>
      </div>
    </Link>
  );
}
