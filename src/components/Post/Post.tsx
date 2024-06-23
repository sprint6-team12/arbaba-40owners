import Image from 'next/image';
import Link from 'next/link';
import ActiveClock from '/public/images/icon-clock.svg';
import InActiveClock from '/public/images/icon-clock-inactive.svg';
import ActiveLocation from '/public/images/icon-location.svg';
import InActiveLocation from '/public/images/icon-location-inactive.svg';
import percentageCalculator from '@/components/Post/percentageCalculator';
import formatTime from '@/components/Post/formatTime';
import GrayArrow from '/public/images/icon-arrow-up-gray.svg';
import RedArrow from '/public/images/icon-arrow-up-red.svg';

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
      className={`flex flex-col justify-between w-[10.7rem] tablet:w-[19.5rem] pc:w-[19.5rem] h-[16.3rem] tablet:h-[21.8rem] pc:h-[21.8rem] bg-white rounded-12px p-12px tablet:p-16px pc:p-16px border border-gray20 ${isClosed ? 'pointer-events-none' : ''}`}
    >
      <div className="relative mb-12px tablet:mb-20px pc:mb-20px rounded-12px overflow-hidden w-[147px] tablet:w-280px pc:w-280px h-[84px] tablet:160px pc:160px">
        <Image
          src={imageUrl}
          className={`rounded-12px ${isClosed ? 'brightness-40' : ''}`}
          alt="가게 사진"
          fill
        />
        {isClosed && (
          <p className="text-20px tablet:text-28px pc:text-28px font-[700] text-gray30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {getClosedText()}
          </p>
        )}
      </div>
      <div>
        <div className="flex flex-col gap-8px tablet:">
          <div>
            <h2
              className={`text-16px tablet:text-20px pc:text-20px font-[700] ${isClosed ? 'text-gray-30' : ''}`}
            >
              {name}
            </h2>
          </div>

          <div
            className={`flex items-center gap-6px text-gray50 ${isClosed ? 'text-gray30' : ''}`}
          >
            {isClosed ? (
              <InActiveClock aria-label="시간비활성화" />
            ) : (
              <ActiveClock aria-label="시간활성화" />
            )}
            <p className="text-12px tablet:text-14px pc:text-14px font-[400] break-keep">
              {formatTime(startsAt, workhour)}
            </p>
          </div>

          <div
            className={`flex items-center gap-6px ${isClosed ? 'text-gray30' : ''}`}
          >
            {isClosed ? (
              <InActiveLocation aria-label="장소활성화" />
            ) : (
              <ActiveLocation aria-label="장소비활성화" />
            )}
            <p className="text-12px tablet:text-14px pc:text-14px text-gray50 font-[400]">
              {address1}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-0px tablet:flex-row pc:flex-row">
          <div className="flex justify-between items-center mt-15px tablet:mt-8px pc:mt-0">
            <p
              className={`text-18px tablet:text-24px pc:text-24px font-[700] tablet:mr-9px pc:mr-9px ${isClosed ? 'text-gray-300' : ''}`}
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
      </div>
    </Link>
  );
}
