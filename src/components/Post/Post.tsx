import Link from 'next/link';
import { useState } from 'react';
import PostImage from './PostImage';
import PostInformation from './PostInformation';
import PostPrice from './PostPrice';

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
  const [currentPostState, setCurrentPostState] = useState({
    isPassed: new Date() > new Date(startsAt),
    isClosed: closed || new Date() > new Date(startsAt),
  });

  const CLOSED_TEXT = '마감 완료';
  const PASSED_TEXT = '지난 공고';

  return (
    <Link
      href={href}
      className={`flex flex-col justify-between w-[10.7rem] tablet:w-[19.5rem] pc:w-[19.5rem] h-[16.3rem] tablet:h-[21.8rem] pc:h-[21.8rem] bg-white rounded-12px p-12px tablet:p-16px pc:p-16px border border-gray20 ${currentPostState.isClosed ? 'pointer-events-none' : ''}`}
    >
      <PostImage
        imageUrl={imageUrl}
        isClosed={currentPostState.isClosed}
        closedText={CLOSED_TEXT}
        passedText={PASSED_TEXT}
      />
      <PostInformation
        name={name}
        startsAt={startsAt}
        workhour={workhour}
        address1={address1}
        isClosed={currentPostState.isClosed}
      />
      <PostPrice
        hourlyPay={hourlyPay}
        originalHourlyPay={originalHourlyPay}
        isClosed={currentPostState.isClosed}
      />
    </Link>
  );
}
