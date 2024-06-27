import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import Dropdown from '@/components/Dropdown/Dropdown';
import Filter from '@/components/Filter/Filter';
import Pagination from '@/components/Pagination/Pagination';
import PostCard from '@/components/Post/PostCard';
import SearchPage from '@/components/SearchPage/searchPage';
import useMediaQuery from '@/lib/utils/useMediaQuery';
import keywordDataState from '@/recoil/atoms/searchAtom';
interface HomeProps {
  data: Data;
}

export default function Home({ data }: HomeProps) {
  // 화면 크기 감지
  const { isMobile } = useMediaQuery();
  // 페이진이션에 전달할 함수

  // console.log('noticeData:', data.items[0].item);
  // console.log('Shop:', data.items[0].item.shop.item);
  const handlePageChange = (page: number) => {
    alert(page);
  };

  //드롭다운에 전달할 함수
  const handleSelectClick = (value: string) => {
    alert(value);
  };

  const searchValue = useRecoilValue(keywordDataState);
  if (searchValue !== '') {
    return <SearchPage />;
  }

  return (
    <main>
      <div className="bg-red10 h-381px tablet:h-[535px] pc:h-[535px] pt-40px">
        <div className="flex flex-col gap-16px tablet:gap-32px pc:gap-32px ml-12px tablet:ml-32px pc:m-auto pc:w-[964px]">
          <h1 className="text-20px tablet:text-28px pc:text-28px font-bold">
            맞춤 공고
          </h1>
          <div className="flex flex-grow-0 flex-shrink-0 h-274px tablet:h-378px pc:h-349px gap-4px tablet:gap-14px pc:gap-14px overflow-x-auto no-scrollbar">
            {/*TODO: 맞춤 공고만 3개 필터해서 넣기 임시로 그냥 3개 자름 */}
            {data.items.slice(0, 3).map(({ item }) => {
              const noticeData = item;
              const shopData = item.shop.item;
              return (
                <div
                  key={noticeData.id}
                  className="flex-none min-w-171px tablet:max-w-[112px]"
                >
                  <PostCard
                    noticeData={noticeData}
                    shopData={shopData}
                    bgNone={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pt-40px tablet:pt-60px pc:pt-60px">
        <div className="flex flex-col w-351px tablet:w-[678px] pc:w-[964px] m-auto">
          <div className="flex flex-col tablet:flex-row pc:flex-row tablet:justify-between pc: justify-between">
            <h1 className="mb-16px tablet:mb-32px pc:mb-32px text-20px tablet:text-28px pc:text-28px font-bold">
              전체 공고
            </h1>
            <div className="filter_container flex items-center mb-16px">
              <Dropdown
                options={['마감임박순', '시급많은순', '시간적은순', '가나다순']}
                onSelect={handleSelectClick}
                width="w-105px"
              />
              <Filter />
            </div>
          </div>
          {/* 필터 변경하면 랜더링 변경 */}
          <div className="flex flex-wrap gap-8px tablet:gap-14px">
            {data.items.map(({ item }) => {
              const noticeData = item;
              const shopData = item.shop.item;
              return (
                <PostCard
                  key={noticeData.id}
                  noticeData={noticeData}
                  shopData={shopData}
                  className="w-171px tablet:w-332px pc:w-312px mb-8px tablet:mb-18px pc:17px"
                />
              );
            })}
          </div>
          <div className="inline-block mx-auto mt-40px mb-60px">
            <Pagination
              totalPages={10}
              currentPage={1}
              hasNext={true}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(
    'https://bootcamp-api.codeit.kr/api/0-1/the-julge/notices?offset=0&limit=6',
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDg5MzlmYi1hOTQ3LTQzM2ItYTZiNi0wN2NlZjZmMDQ0OTYiLCJpYXQiOjE3MTk0MDA5NzB9.TN22rdNGWTSRB3EOF6JIeBxQWZ2Jmf6S2NCKmn2am2Y`,
      },
    }
  );
  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
