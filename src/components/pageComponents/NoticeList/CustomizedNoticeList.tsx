import Link from 'next/link';
import PostCard from '@/components/Post/PostCard';
import useCustomizedNotices from '@/hooks/useCustomizedNotices';
import removePrefix from '@/lib/utils/RemovePrefix';
import useMediaQuery from '@/lib/utils/useMediaQuery';

export default function CustomizedNoticeList() {
  const { isMobile } = useMediaQuery();
  const customizedNotices = useCustomizedNotices();

  return (
    <div className="bg-red10 h-381px tablet:h-[535px] pc:h-[535px] pt-40px">
      <div className="flex flex-col gap-16px tablet:gap-32px pc:gap-32px ml-12px tablet:ml-32px pc:m-auto pc:w-[964px]">
        <h1 className="text-20px tablet:text-28px pc:text-28px font-bold">
          맞춤 공고
        </h1>
        <div className="flex pc:flex-center flex-grow-0 flex-shrink-0 h-274px tablet:h-378px pc:h-349px gap-4px tablet:gap-14px pc:gap-14px overflow-x-auto no-scrollbar">
          {customizedNotices.items.map(({ item, links }) => {
            if (!('shop' in item)) return null;
            const noticeData = item;
            const shopData = item.shop.item;
            const hrefValue = removePrefix(links[0].href);

            return (
              <Link
                href={hrefValue}
                key={noticeData.id}
                className="flex-none w-171px tablet:w-312px pc:w-312px"
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
