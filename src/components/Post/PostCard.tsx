import Link from 'next/link';
import Post from '@/components/Post/Post';

interface PostCardProps {
  item: Notice;
  className?: string;
}

export default function PostCard({ item, className }: PostCardProps) {
  const { hourlyPay, startsAt, closed, workhour, shop } = item;
  const { name, address1, imageUrl, originalHourlyPay } = shop.item;
  const isPassed = new Date() > new Date(startsAt);
  const currentPostState: NoticeStatus = closed
    ? 'closed'
    : isPassed
      ? 'passed'
      : 'open';
  const formattedPay = hourlyPay.toLocaleString() + '원';

  return (
    <Link href={shop.href} className={`${className}`}>
      <Post
        status={currentPostState}
        className={`flex flex-col justify-between w-full min-h-[16.3rem] tablet:min-h-[21.8rem] pc:min-h-[21.8rem] bg-white rounded-12px p-12px tablet:p-16px pc:p-16px border border-gray20 ${closed ? 'pointer-events-none' : ''}`}
      >
        <Post.Image
          imageUrl={imageUrl}
          status={currentPostState}
          className="w-full aspect-video mb-12px tablet:mb-20px"
        />
        <div className="flex flex-col gap-8px tablet:">
          <Post.SubTitle text={name} status={currentPostState} />
          <Post.WorkSchedule
            startsAt={startsAt}
            workHour={workhour}
            status={currentPostState}
          />
          <Post.Location address={address1} status={currentPostState} />
        </div>
        <div className="flex justify-between flex-col pt-16px gap-0px tablet:flex-row pc:flex-row mt-auto">
          <Post.Title
            text={formattedPay}
            status={currentPostState}
            className="shrink-0"
          />
          <Post.IncreaseRateBadge
            hourlyPay={hourlyPay}
            originalHourlyPay={originalHourlyPay}
          />
        </div>
      </Post>
    </Link>
  );
}
