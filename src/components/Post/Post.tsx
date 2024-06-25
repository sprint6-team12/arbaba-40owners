import Image from 'next/image';
import React from 'react';
import RateBadge from '@/components/Badge/RateBadge';
import FormatUtils from '@/lib/utils/FormatUtils';
import {
  IconClock,
  IconClockActive,
  IconLocation,
  IconLocationActive,
} from '@/utils/Icons';

export const POST_STATUS_STYLE_MAP = {
  open: {
    titleTextColor: 'text-black',
    textColor: 'text-gray50',
    alertTextColor: 'text-red40',
    borderColor: 'bg-red40',
    imageText: null,
  },
  closed: {
    titleTextColor: 'text-black',
    textColor: 'text-gray30',
    alertTextColor: 'text-gray30',
    borderColor: 'bg-gray30',
    imageText: '마감 완료',
  },
  passed: {
    titleTextColor: 'text-black',
    textColor: 'text-gray50',
    alertTextColor: 'text-red40',
    borderColor: 'bg-red40',
    imageText: '지난 공고',
  },
} as const;

interface PostProps {
  status: NoticeStatus;
  [key: string]: unknown;
}

function PostWrapper({
  className = '',
  children,
  status,
}: {
  className?: string;
  children: React.ReactNode;
  status: NoticeStatus;
}) {
  return (
    <div className={`relative ${className}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              status,
            } as PostProps)
          : child
      )}
    </div>
  );
}

function PostImage({
  className = '',
  imageUrl,
  status,
}: {
  className?: string;
  imageUrl: string;
  status: NoticeStatus;
}) {
  const statusText = POST_STATUS_STYLE_MAP[status].imageText;
  const ImageOverlay = (
    <div className="absolute inset-0 flex-center text-16px tablet:text-28px pc:text-28px font-bold text-gray30 bg-black opacity-20">
      {statusText}
    </div>
  );

  return (
    <div className={`relative rounded-12px overflow-hidden ${className}`}>
      {statusText && ImageOverlay}
      <Image src={imageUrl} className="rounded-12px" alt="가게 사진" fill />
    </div>
  );
}

function Title({
  className = '',
  text,
  status,
}: {
  className?: string;
  text: string;
  status: NoticeStatus;
}) {
  const textColor = POST_STATUS_STYLE_MAP[status].titleTextColor;

  return (
    <h2
      className={`text-18px tablet:text-24px pc:text-24px font-[700] tablet:mr-9px pc:mr-9px ${textColor} ${className}`}
    >
      {text}
    </h2>
  );
}

function SubTitle({
  className = '',
  text,
  status,
}: {
  className?: string;
  text: string;
  status: NoticeStatus;
}) {
  const textColor = POST_STATUS_STYLE_MAP[status].titleTextColor;

  return (
    <h4
      className={`text-16px tablet:text-20px pc:text-20px font-[700] ${textColor} ${className}`}
    >
      {text}
    </h4>
  );
}

function TitleBadge({
  className = '',
  badgeText,
}: {
  className?: string;
  badgeText: string;
}) {
  return (
    <span
      className={`text-custom-orange text-14px font-bold tablet:text-16px ${className}`}
    >
      {badgeText}
    </span>
  );
}

function WorkSchedule({
  className = '',
  startsAt,
  workHour,
  status,
}: {
  className?: string;
  startsAt: string;
  workHour: number;
  status: NoticeStatus;
}) {
  const {
    formattedStartDate,
    formattedStartTime,
    formattedEndTime,
    durationHours,
  } = FormatUtils.workSchedule(startsAt, workHour);
  const textColor = POST_STATUS_STYLE_MAP[status].textColor;

  const clockIcon =
    status === 'closed' ? (
      <IconClockActive aria-label="시간 비활성화" />
    ) : (
      <IconClock aria-label="시간 활성화" />
    );

  return (
    <div className={`flex gap-6px ${textColor} ${className}`}>
      {clockIcon}
      <div className="flex gap-4px flex-wrap leading-[22px] text-12px tablet:text-14px pc:text-14px font-[400] break-keep">
        <p>{formattedStartDate}</p>
        <p>
          {formattedStartTime} ~ {formattedEndTime} ({durationHours}시간)
        </p>
      </div>
    </div>
  );
}

function Location({
  className = '',
  address,
  status,
}: {
  className?: string;
  address: string;
  status: NoticeStatus;
}) {
  const textColor = POST_STATUS_STYLE_MAP[status].textColor;

  const locationIcon =
    status === 'closed' ? (
      <IconLocationActive aria-label="장소 비활성화" />
    ) : (
      <IconLocation aria-label="장소 활성화" />
    );

  return (
    <div className={`flex items-center gap-6px ${className}`}>
      {locationIcon}
      <p
        className={`text-12px tablet:text-14px pc:text-14px font-[400] leading-[22px] ${textColor}`}
      >
        {address}
      </p>
    </div>
  );
}

function HourlyPayPercentBadge({
  hourlyPay,
  originalHourlyPay,
}: {
  hourlyPay: number;
  originalHourlyPay: number;
}) {
  const { roundedPercentage } = FormatUtils.payIncreasePercent(
    hourlyPay,
    originalHourlyPay
  );

  return <RateBadge rate={roundedPercentage} />;
}

const Post = Object.assign(PostWrapper, {
  Image: PostImage,
  Title: Title,
  TitleBadge: TitleBadge,
  SubTitle: SubTitle,
  WorkSchedule: WorkSchedule,
  Location: Location,
  IncreaseRateBadge: HourlyPayPercentBadge,
});

export default Post;
