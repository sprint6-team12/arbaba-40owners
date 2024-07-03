import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Pagination from '@/components/Pagination/Pagination';
import PostCard from '@/components/Post/PostCard';
import SortDropdown from '@/components/SortDropdown/SortDropdown';
import { SORT_OPTION_MAP } from '@/constants/sortOptionMap';
import noticeAPI from '@/lib/api/noticeAPI';
import removePrefix from '@/lib/utils/RemovePrefix';
import useMediaQuery from '@/lib/utils/useMediaQuery';
import keywordDataState from '@/recoil/atoms/searchAtom';
import Filter from '../../Filter/Filter';

interface SearchPageProps {
  data: NoticeListResponseData;
}

function SearchPage({ data }: SearchPageProps) {
  const { isMobile } = useMediaQuery();
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
  const searchValue = useRecoilValue(keywordDataState);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSettings, setCurrentSettings] = useState({
    offset: 0,
    limit: 6,
    keyword: '',
    address: [] as string[],
    startsAtGte: '',
    hourlyPayGte: '',
    sort: 'time',
  });

  const callAPI = async (settings: typeof currentSettings, page: number) => {
    const params = new URLSearchParams();
    Object.entries(settings).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== '') {
        params.append(key, value.toString());
      }
    });
    params.set('offset', ((page - 1) * settings.limit).toString());
    const newNoticeData = await noticeAPI.getNoticeList(params);
    setNoticeData(newNoticeData);
    setCurrentPage(page);
  };

  const handleSortClick = async (value: string) => {
    const sortValue =
      SORT_OPTION_MAP[value as keyof typeof SORT_OPTION_MAP] || 'time';
    const newSettings = {
      ...currentSettings,
      sort: sortValue,
    };
    setCurrentSettings(newSettings);
    await callAPI(newSettings, 1);
  };

  const fetchFilterData = async (params: URLSearchParams) => {
    const newAddresses = params.getAll('address');
    const newSettings = {
      ...currentSettings,
      address: newAddresses,
      startsAtGte: params.get('startsAtGte') || '',
      hourlyPayGte: params.get('hourlyPayGte') || '',
    };

    if (newAddresses.length === 0) {
      newSettings.address = [];
    }

    setCurrentSettings(newSettings);
    await callAPI(newSettings, 1);
  };

  const handlePageChange = async (page: number) => {
    await callAPI(currentSettings, page);
  };

  useEffect(() => {
    const newSettings = {
      ...currentSettings,
      keyword: searchValue,
    };
    setCurrentSettings(newSettings);
    callAPI(newSettings, 1);
  }, [searchValue]);

  return (
    <div className="pt-40px tablet:pt-60px pc:pt-60px">
      <div className="relative flex flex-col w-351px tablet:w-[678px] pc:w-[964px] m-auto">
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
            currentPage={currentPage}
            hasNext={noticeData.hasNext}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
