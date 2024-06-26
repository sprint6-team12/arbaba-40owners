import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import Filter from '@/components/Filter/Filter';
import Pagination from '@/components/Pagination/Pagination';
import PostCard from '@/components/Post/PostCard';
import SearchPage from '@/components/SearchPage/searchPage';
import keywordDataState from '@/recoil/atoms/searchAtom';
// import { useEffect } from 'react';

interface ItemDetails extends Notice {
  name: string;
  startsAt: string;
  workhour: number;
  address1: string;
  imageUrl: string;
  closed: boolean;
  hourlyPay: number;
  originalHourlyPay: number;
}

interface Item {
  id: string;
  item: ItemDetails;
}

interface Data {
  items: Item[];
}

interface HomeProps {
  data: Data;
}

export default function Home({ data }: HomeProps) {
  // useEffect(() => {
  //   // 데이터 연결하기 위해 조회
  // }, []);

  const onPageChange = (page: number) => {
    alert(page);
  };

  const searchValue = useRecoilValue(keywordDataState);

  if (searchValue !== '') <SearchPage />;

  return (
    <main>
      <div className="bg-red10 h-381px tablet:h-[535px] pc:h-[535px] pt-40px">
        <div className="flex flex-col gap-16px tablet:gap-32px pc:gap-32px ml-12px tablet:ml-32px pc:m-auto pc:w-[964px]">
          <h1 className="text-20px tablet:text-28px pc:text-28px font-bold">
            맞춤 공고
          </h1>
          <div className="flex flex-grow h-261px tablet:h-349px pc:h-349px gap-4px overflow-x-auto no-scrollbar">
            {data.items.map((item: Item) => (
              <PostCard
                key={item.id}
                item={item.item}
                className="flex-none w-171px h-261px"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="pt-40px tablet:pt-60px pc:pt-60px">
        <div className="flex flex-col w-351px tablet:w-[678px] pc:w-[964px] m-auto">
          <div className="flex flex-col tablet:flex-row pc:flex-row tablet:justify-between pc: justify-between">
            <h1 className="mb-16px tablet:mb-32px pc:mb-32px text-20px tablet:text-28px pc:text-28px font-bold">
              전체 공고
            </h1>
            <div className="filter_container mb-16px">
              <select className="w-105px h-30px border-1px border-red40">
                <option>마감임박순</option>
                <option>시급많은순</option>
                <option>시간적은순</option>
                <option>가나다순</option>
              </select>
              <Filter />
            </div>
          </div>
          {/* 필터 변경하면 랜더링 변경 */}
          {/* {jobs.items.map((data: any) => (
            <PostCard item={data.item} />
          ))} */}
          <div className="inline-block mx-auto mt-40px mb-60px">
            <Pagination
              totalPages={10}
              currentPage={1}
              hasNext={true}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(
    'https://bootcamp-api.codeit.kr/api/0-1/the-julge/notices?offset=0&limit=3',
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
