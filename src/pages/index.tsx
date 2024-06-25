import RateBadge from '@/components/Badge/RateBadge';
import Filter from '@/components/Filter/Filter';
import Pagination from '@/components/Pagination/Pagination';

export default function Home() {
  const onPageChange = (page: number) => {
    alert(page);
  };

  return (
    <main>
      {/* 맞춤 공고 */}
      <div className="bg-red10 h-381px tablet:h-[535px] pc:h-[535px] pt-60px">
        <div className="flex flex-col gap-16px tablet:gap-32px pc:gap-32px ml-12px tablet:ml-32px pc:m-auto pc:w-[964px]">
          <h1 className="text-20px tablet:text-28px pc:text-28px font-bold">
            맞춤 공고
          </h1>
          {/* bg-gray20은 임시 */}
          <div className="h-261px tablet:h-349px pc:h-349px bg-gray20"></div>
        </div>
      </div>
      {/* 전체 공고 */}
      <div className=" h-381px tablet:h-[535px] pc:h-[535px] pt-40px tablet:pt-60px pc:pt-60px">
        <div className="flex flex-col w-350px tablet:w-[678px] pc:w-[964px] m-auto">
          <div className="flex flex-col tablet:flex-row pc:flex-row tablet:justify-between pc: justify-between">
            <h1 className="text-20px tablet:text-28px pc:text-28px font-bold">
              전체 공고
            </h1>
            <div className="filter_container">
              <select className="w-105px h-30px border-1px border-red40">
                <option>마감임박순</option>
                <option>1</option>
              </select>
              {/* 필터버튼 */}
              <Filter />
            </div>
          </div>
          <div className="list_container p-50px">
            <RateBadge rate={100} />
          </div>
        </div>
      </div>
      <Pagination
        totalPages={10}
        currentPage={1}
        hasNext={true}
        onPageChange={onPageChange}
      />
    </main>
  );
}
