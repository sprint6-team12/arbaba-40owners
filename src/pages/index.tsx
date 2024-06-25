import { useRecoilValue } from 'recoil';
import Filter from '@/components/Filter/Filter';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import SearchPage from '@/components/SearchPage/seachPage';
import keywordDataState from '@/recoil/atoms/searchAtom';

export default function Home() {
  // -- mock data -- //
  const mockDatas = [
    {
      hourlyPay: 15,
      startsAt: '2024-06-25T08:00:00Z',
      closed: false,
      workhour: 8,
      name: 'Restaurant A',
      address1: '123 Main St, City, Country',
      imageUrl:
        'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
      originalHourlyPay: 12,
      href: '/job/1',
    },
    {
      hourlyPay: 20,
      startsAt: '2024-06-26T09:00:00Z',
      closed: false,
      workhour: 6,
      name: 'Cafe B',
      address1: '456 Maple St, City, Country',
      imageUrl:
        'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
      originalHourlyPay: 18,
      href: '/job/2',
    },
    {
      hourlyPay: 18,
      startsAt: '2024-06-27T10:00:00Z',
      closed: true,
      workhour: 7,
      name: 'Shop C',
      address1: '789 Oak St, City, Country',
      imageUrl:
        'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
      originalHourlyPay: 15,
      href: '/job/3',
    },
    {
      hourlyPay: 22,
      startsAt: '2024-06-28T11:00:00Z',
      closed: false,
      workhour: 5,
      name: 'Store D',
      address1: '101 Pine St, City, Country',
      imageUrl:
        'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
      originalHourlyPay: 20,
      href: '/job/4',
    },
    {
      hourlyPay: 16,
      startsAt: '2024-06-29T12:00:00Z',
      closed: false,
      workhour: 8,
      name: 'Warehouse E',
      address1: '202 Birch St, City, Country',
      imageUrl:
        'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
      originalHourlyPay: 14,
      href: '/job/5',
    },
    {
      hourlyPay: 19,
      startsAt: '2024-06-30T13:00:00Z',
      closed: true,
      workhour: 6,
      name: 'Factory F',
      address1: '303 Cedar St, City, Country',
      imageUrl:
        'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
      originalHourlyPay: 17,
      href: '/job/6',
    },
    // {
    //   hourlyPay: 21,
    //   startsAt: '2024-07-01T14:00:00Z',
    //   closed: false,
    //   workhour: 7,
    //   name: 'Office G',
    //   address1: '404 Elm St, City, Country',
    //   imageUrl:
    //     'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
    //   originalHourlyPay: 19,
    //   href: '/job/7',
    // },
    // {
    //   hourlyPay: 23,
    //   startsAt: '2024-07-02T15:00:00Z',
    //   closed: false,
    //   workhour: 5,
    //   name: 'Hospital H',
    //   address1: '505 Spruce St, City, Country',
    //   imageUrl:
    //     'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
    //   originalHourlyPay: 21,
    //   href: '/job/8',
    // },
    // {
    //   hourlyPay: 17,
    //   startsAt: '2024-07-03T16:00:00Z',
    //   closed: false,
    //   workhour: 8,
    //   name: 'Library I',
    //   address1: '606 Willow St, City, Country',
    //   imageUrl:
    //     'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
    //   originalHourlyPay: 15,
    //   href: '/job/9',
    // },
    // {
    //   hourlyPay: 24,
    //   startsAt: '2024-07-04T17:00:00Z',
    //   closed: false,
    //   workhour: 6,
    //   name: 'School J',
    //   address1: '707 Fir St, City, Country',
    //   imageUrl:
    //     'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
    //   originalHourlyPay: 22,
    //   href: '/job/10',
    // },
    // {
    //   hourlyPay: 20,
    //   startsAt: '2024-07-05T18:00:00Z',
    //   closed: false,
    //   workhour: 7,
    //   name: 'Gym K',
    //   address1: '808 Ash St, City, Country',
    //   imageUrl:
    //     'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
    //   originalHourlyPay: 18,
    //   href: '/job/11',
    // },
    // {
    //   hourlyPay: 25,
    //   startsAt: '2024-07-06T19:00:00Z',
    //   closed: false,
    //   workhour: 5,
    //   name: 'Park L',
    //   address1: '909 Poplar St, City, Country',
    //   imageUrl:
    //     'https://content.surfit.io/thumbs/image/3qaB3/DMXjj/630104627667984efb7d79.png/cover-bottom-1x.webp',
    //   originalHourlyPay: 23,
    //   href: '/job/12',
    // },
  ];
  // -- mock data -- //

  const onPageChange = (page: number) => {
    alert(page);
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
          <div className="h-261px tablet:h-349px pc:h-349px flex gap-4px overflow-x-auto no-scrollbar">
            {mockDatas.map((data, index) => (
              <Post {...data} key={index} />
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
          <div className="flex flex-wrap gap-8px flex-grow-1">
            {mockDatas.map((data, index) => (
              <Post {...data} key={index} />
            ))}
          </div>
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
