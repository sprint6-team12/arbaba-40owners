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
  const clockIcon = isClosed ? (
    <InActiveClock aria-label="시간 비활성화" />
  ) : (
    <ActiveClock aria-label="시간 활성화" />
  );
  const locationIcon = isClosed ? (
    <InActiveLocation aria-label="장소활성화" />
  ) : (
    <ActiveLocation aria-label="장소비활성화" />
  );
  const textColor = isClosed ? 'text-gray30' : 'text-gray50';
  const nameColor = isClosed ? 'text-gray30' : 'text-black';

  return (
    <div className="flex flex-col gap-8px tablet:">
      <div>
        <h2
          className={`text-16px tablet:text-20px pc:text-20px font-[700] ${nameColor}`}
        >
          {name}
        </h2>
      </div>

      <div className={`flex items-center gap-6px ${textColor}`}>
        {clockIcon}
        <p className="text-12px tablet:text-14px pc:text-14px font-[400] break-keep">
          {formatTime(startsAt, workhour)}
        </p>
      </div>

      <div className="flex items-center gap-6px">
        {locationIcon}
        <p
          className={`text-12px tablet:text-14px pc:text-14px font-[400] ${textColor}`}
        >
          {address1}
        </p>
      </div>
    </div>
  );
}
