import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import Filter from '@/components/Filter/Filter';
import SearchPage from '@/components/pageComponents/SearchPage/searchPage';
import Pagination from '@/components/Pagination/Pagination';
import PostCard from '@/components/Post/PostCard';
import SortDropdown from '@/components/SortDropdown/SortDropdown';
import useCustomizedNotices from '@/hooks/useCustomizedNotices';
import useNoticeList from '@/hooks/useNoticeList';
import noticeAPI from '@/lib/api/noticeAPI';
import removePrefix from '@/lib/utils/RemovePrefix';
import useMediaQuery from '@/lib/utils/useMediaQuery';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';

export default function Home(data: NoticeListResponseData) {
  const { isMobile } = useMediaQuery();
  const customizedNotices = useCustomizedNotices();
  const searchResults = useRecoilValue(searchResultState);
  const keyword = useRecoilValue(keywordDataState);
  const isSearchData = keyword !== '';
  const {
    noticeData,
    currentPage,
    handlePageChange,
    handleSortClick,
    fetchFilterData,
  } = useNoticeList(data);

  isSearchData && <SearchPage data={searchResults} />;

  return (
    <main>
      {/* TODO: 맞춤공고 컴포넌트 분리 */}
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
      {/* TODO: 전체공고 컴포넌트 분리 */}
      <div className="pt-40px tablet:pt-60px pc:pt-60px">
        <div className="flex flex-col w-351px tablet:w-[678px] pc:w-[964px] m-auto">
          <div className="flex flex-col tablet:flex-row pc:flex-row tablet:justify-between pc: justify-between">
            <h1 className="mb-16px tablet:mb-32px pc:mb-32px text-20px tablet:text-28px pc:text-28px font-bold">
              전체 공고
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
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await noticeAPI.getNoticeList({ offset: 0, limit: 6 });

  return {
    props: data,
  };
};
