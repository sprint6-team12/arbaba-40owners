// import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
// import Dropdown from '../../Dropdown/Dropdown';
import Pagination from '@/components/Pagination/Pagination';
import PostCard from '@/components/Post/PostCard';
import SortDropdown from '@/components/SortDropdown/SortDropdown';
import { SORT_OPTION_MAP } from '@/constants/sortOptionMap';
import noticeAPI from '@/lib/api/noticeAPI';
import paginationUtils from '@/lib/utils/paginationUtils';
import removePrefix from '@/lib/utils/RemovePrefix';
import useMediaQuery from '@/lib/utils/useMediaQuery';
import keywordDataState from '@/recoil/atoms/searchAtom';
import Filter from '../../Filter/Filter';

interface SearchPageProps {
  data: NoticeListResponseData;
}

function SearchPage({ data }: SearchPageProps) {
  const { isMobile } = useMediaQuery();
  // const router = useRouter();
  const [noticeData, setNoticeData] = useState<NoticeListResponseData>({
    items: [],
    count: 0,
    offset: 0,
    limit: 6,
    hasNext: false,
    address: [],
    links: [],
  });
  useEffect(() => {
    setNoticeData({
      items: data.items,
      count: data.count,
      offset: data.offset,
      limit: data.limit,
      hasNext: data.hasNext,
      address: data.address,
      links: data.links,
    });
  }, [data]);

  const handlePageChange = async (page: number) => {
    const limit = noticeData.limit;
    const offset = (page - 1) * limit;

    const newNoticeData = await noticeAPI.getNoticeList({ offset, limit });
    setNoticeData(newNoticeData);
  };

  // console.log(noticeData);

  const handleSortClick = async (value: string) => {
    // 검색 결과를 정렬해서 업데이트
    const sortValue =
      SORT_OPTION_MAP[value as keyof typeof SORT_OPTION_MAP] || 'time';
    const sortedData = await noticeAPI.getNoticeList({
      sort: sortValue,
      keyword: searchValue,
    });
    setNoticeData(sortedData);
    handlePageChange(1);
  };

  const fetchFilterData = async (params: URLSearchParams) => {
    // 검색 결과를 필터해서 업데이트
    const filteredData = await noticeAPI.getNoticeList(params);
    setNoticeData(filteredData);
  };

  const searchValue = useRecoilValue(keywordDataState);

  return (
    <div className="pt-40px tablet:pt-60px pc:pt-60px">
      <div className="flex flex-col w-351px tablet:w-[678px] pc:w-[964px] m-auto">
        <div className="flex flex-col tablet:flex-row pc:flex-row tablet:justify-between pc: justify-between">
          <h1 className="mb-16px tablet:mb-32px pc:mb-32px text-20px tablet:text-28px pc:text-28px font-bold">
            <span className="text-red40">{searchValue}</span>에 대한 공고 목록
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
            currentPage={paginationUtils.currentPage}
            hasNext={noticeData.hasNext}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
