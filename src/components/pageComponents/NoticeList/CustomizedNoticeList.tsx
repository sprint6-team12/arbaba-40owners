import Link from 'next/link';
import PostCard from '@/components/Post/PostCard';
import useCustomizedNotices from '@/hooks/useCustomizedNotices';
import useMediaQuery from '@/hooks/useMediaQuery';
import removePrefix from '@/lib/utils/RemovePrefix';

export default function CustomizedNoticeList() {
  const { isMobile } = useMediaQuery();
  const customizedNotices = useCustomizedNotices();

  return (
    <div className="bg-red10 flex h-auto min-h-[400px] tablet:min-h-[535px] pc:min-h-[535px] w-screen py-40px">
      <div className="flex flex-col gap-16px mx-auto w-screen px-12px tablet:gap-32px pc:gap-32px tablet:px-32px pc:m-auto pc:w-[calc(964px+24px)]">
        <h1 className="text-20px tablet:text-28px pc:text-28px font-bold">
          맞춤 공고
        </h1>
        <div className="flex items-center flex-grow-0 flex-shrink-0 min-h-[300px] tablet:min-h-[378px] pc:min-h-[358px] gap-4px tablet:gap-14px pc:gap-8px w-full overflow-x-scroll no-scrollbar">
          {customizedNotices.items.map(({ item, links }) => {
            if (!('shop' in item)) return null;
            const noticeData = item;
            const shopData = item.shop.item;
            const hrefValue = removePrefix(links[0].href);

            return (
              <Link
                href={hrefValue}
                key={noticeData.id}
                className="flex-none w-171px tablet:w-312px pc:w-312px hover:animate-scale-up"
              >
                <PostCard
                  noticeData={noticeData}
                  shopData={shopData}
                  bgNone={isMobile}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
