import formatTimeRange from '@/lib/utils/formatTime';
import {
  IconClock,
  IconClockActive,
  IconLocation,
  IconLocationActive,
} from '@/utils/Icons';

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
  const { startDateString, startTimeString, endTimeString } = formatTimeRange(
    startsAt,
    workhour
  );

  const clockIcon = isClosed ? (
    <IconClockActive aria-label="시간 비활성화" />
  ) : (
    <IconClock aria-label="시간 활성화" />
  );
  const locationIcon = isClosed ? (
    <IconLocationActive aria-label="장소 비활성화" />
  ) : (
    <IconLocation aria-label="장소 활성화" />
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
          {`${startDateString} ${startTimeString} ~ ${endTimeString} (${workhour}시간)`}
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
