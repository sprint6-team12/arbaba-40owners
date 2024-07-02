import { useRecoilValue } from 'recoil';
import NoticeDetailCardButton from '@/components/pageComponents/NoticeDetail/NoticeDetailCardButton';
import Post from '@/components/Post/Post';
import FormatUtils from '@/lib/utils/FormatUtils';
import { userState } from '@/recoil/atoms/AuthAtom';

interface NoticeDetailCardProps {
  data: NoticeItem;
}

function NoticeDetailCard({ data }: NoticeDetailCardProps) {
  const { shopId, type } = useRecoilValue(userState);

  if (!('shop' in data.item)) return null;
  const {
    hourlyPay,
    startsAt,
    workhour,
    closed,
    shop,
    currentUserApplication,
  } = data.item;
  const {
    id: shop_id,
    address1,
    imageUrl,
    description,
    originalHourlyPay,
  } = shop.item;

  const isPassed = new Date() > new Date(startsAt);
  const currentNoticeState = closed ? 'closed' : isPassed ? 'passed' : 'open';
  const currentUserApplicationData = currentUserApplication?.item || null;
  const userType = shop_id === shopId ? 'author' : type;

  const formattedPay = FormatUtils.price(hourlyPay) + '원';

  return (
    <div className="min-w-[351px] w-full flex flex-col gap-8px min-h-[356px] pc:flex-row pc:gap-16px border border-gray20 bg-white rounded-12px p-24px">
      <Post.Image
        imageUrl={imageUrl}
        status={currentNoticeState}
        className="w-full h-178px tablet:h-360px pc:h-full pc:min-h-[360px] pc:max-w-[540px]"
      />
      <div className={`flex flex-col gap-12px pc:w-[70%]`}>
        <Post.TitleBadge badgeText="시급" className="-mb-8px" />
        <div className="flex gap-8px items-center [&>_span]:shrink-0">
          <Post.Title
            text={formattedPay}
            className="shrink-0 text-24px tablet:text-28px"
          />
          {currentNoticeState !== 'closed' && (
            <Post.IncreaseRateBadge
              hourlyPay={hourlyPay}
              originalHourlyPay={originalHourlyPay}
            />
          )}
        </div>
        <Post.WorkSchedule
          startsAt={startsAt}
          workHour={workhour}
          status={currentNoticeState}
        />
        <Post.Location address={address1} status={currentNoticeState} />
        <p className="mt-12px mb-24px">{description}</p>

        <div className="flex flex-col w-full h-full [&_>button]:px-0 [&_>button]:w-full pc:[&_>button]:flex-grow-0 pc:[&_>button]:flex-center pc:[&_>button]:mt-auto">
          <NoticeDetailCardButton
            userType={userType}
            noticeState={currentNoticeState}
            userApplicationData={currentUserApplicationData}
            links={data.links}
          />
        </div>
      </div>
    </div>
  );
}

export default NoticeDetailCard;
