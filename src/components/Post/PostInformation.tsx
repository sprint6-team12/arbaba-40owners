import formatTime from '@/utils/formatTime';
import ActiveClock from '/public/images/icon-clock.svg';
import InActiveClock from '/public/images/icon-clock-inactive.svg';
import ActiveLocation from '/public/images/icon-location.svg';
import InActiveLocation from '/public/images/icon-location-inactive.svg';

interface PostInformationProps {
  name: string;
  startsAt: string;
  workhour: number;
  address1: string;
  isClosed: boolean;
}

export default function PostInformation({
  name,
  startsAt,
  workhour,
  address1,
  isClosed,
}: PostInformationProps) {
  return (
    <div className="flex flex-col gap-8px tablet:">
      <div>
        <h2
          className={`text-16px tablet:text-20px pc:text-20px font-[700] ${
            isClosed ? 'text-gray-30' : ''
          }`}
        >
          {name}
        </h2>
      </div>

      <div
        className={`flex items-center gap-6px text-gray50 ${
          isClosed ? 'text-gray30' : ''
        }`}
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
  );
}
