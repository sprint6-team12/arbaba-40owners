import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ApplicantsList from '@/components/pageComponents/NoticeDetail/ApplicantsList';
import RecentNoticeList from '@/components/pageComponents/NoticeDetail/RecentNoticeList';
import useRecentWatchedNotices from '@/hooks/useRecentWatchedNotices';
import { userState } from '@/recoil/atoms/AuthAtom';

interface NoticeDetailListSectionProps {
  noticeData: Notice;
}

function NoticeDetailListSection({ noticeData }: NoticeDetailListSectionProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { shopId } = useRecoilValue(userState);

  // 최근 본 공고에 현재 공고를 추가하면서 지금까지 본 공고 리스트를 불러옴
  const recentNoticeList = useRecentWatchedNotices(noticeData);
  const isOpen =
    !noticeData.closed && !(new Date() > new Date(noticeData.startsAt));

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  if (!('shop' in noticeData)) return;
  const isAuthor = shopId === noticeData.shop.item.id;

  return (
    <div className="flex flex-col gap-16px tablet:gap-24px my-40px tablet:my-60px">
      {isAuthor ? (
        <ApplicantsList isAuthor={isAuthor} isOpen={isOpen} />
      ) : (
        <RecentNoticeList list={recentNoticeList} />
      )}
    </div>
  );
}

export default NoticeDetailListSection;
