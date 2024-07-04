import Link from 'next/link';
import Filter from '@/components/Filter/Filter';
import Pagination from '@/components/Pagination/Pagination';
import PostCard from '@/components/Post/PostCard';
import SortDropdown from '@/components/SortDropdown/SortDropdown';
import useNoticeList from '@/hooks/useNoticeList';
import removePrefix from '@/lib/utils/RemovePrefix';
import useMediaQuery from '@/lib/utils/useMediaQuery';

interface NoticeListViewProps {
  initialData: NoticeListResponseData;
  title: string | React.ReactNode;
}

function NoticeListView({ initialData, title }: NoticeListViewProps) {
  const { isMobile } = useMediaQuery();
  const {
    noticeData,
    currentPage,
    handlePageChange,
    handleSortClick,
    fetchFilterData,
  } = useNoticeList(initialData);

  return (
    <div className="pt-40px tablet:pt-60px pc:pt-60px">
      <div className="relative flex flex-col w-351px tablet:w-[678px] pc:w-[964px] m-auto">
        <div className="flex flex-col tablet:flex-row pc:flex-row tablet:justify-between pc: justify-between">
          <h1 className="mb-16px tablet:mb-32px pc:mb-32px text-20px tablet:text-28px pc:text-28px font-bold">
            {title}
          </h1>
          <div className="flex items-center mb-16px gap-10px">
            <SortDropdown onClick={handleSortClick} />
            <div className="[&_>button]:m-0">
              <Filter onApplyFilters={fetchFilterData} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-8px tablet:gap-14px">
          {noticeData.items.map(({ item, links }) => {
            if (!('shop' in item)) return null;
            const noticeData = item;
            const shopData = item.shop.item;
            const hrefValue = removePrefix(links[0].href);

            return (
              <Link
                href={hrefValue}
                key={noticeData.id}
                className="w-171px tablet:w-332px pc:w-312px mb-8px tablet:mb-18px pc:18px"
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
        <div className="inline-block mx-auto mt-40px mb-60px">
          <Pagination
            count={noticeData.count}
            limit={noticeData.limit}
            currentPage={currentPage}
            hasNext={noticeData.hasNext}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default NoticeListView;
