import { useEffect, useRef } from 'react';
import StatusBadge from '@/components/Badge/StatusBadge';
import useMediaQuery from '@/hooks/useMediaQuery';
import FormatUtils from '@/lib/utils/FormatUtils';

export interface EmployeeTableApplication {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  shop: ShopData;
  notice: {
    item: Notice;
    href: string;
  };
}

interface EmployeeTableItem {
  item: EmployeeTableApplication;
  links: Link[];
}

export interface EmployeeTableData {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: EmployeeTableItem[];
  links: Link[];
}

interface EmployeeTableProps {
  data: EmployeeTableData;
}

function EmployeeTable({ data }: EmployeeTableProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useMediaQuery();
  const baseThStyle =
    'border-gray20 border-1px bg-red10 text-left h-40px text-12px tablet:text-14px pc:text-14px';
  const baseTdStyle =
    'border-gray20 border-1px bg-white h-46px tablet:h-69px pc:h-69px text-14px tablet:text-16px pc:text-16px';

  const tableHeaders = [
    {
      label: '가게',
      className: `${baseThStyle} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0 p-0 pl-8px`,
    },
    {
      label: '일자',
      className: `${baseThStyle} min-w-162px tablet:min-w-[300px] pc:w-300px pl-8px`,
    },
    {
      label: '시급',
      className: `${baseThStyle} min-w-162px pl-8px`,
    },
    {
      label: '상태',
      className: `${baseThStyle} min-w-162px tablet:min-w-[220px] pc:w-236px pl-12px`,
    },
  ];

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [isMobile, isTablet]);

  return (
    <div
      className="border-1px border-gray20 rounded-tr-10px rounded-tl-10px overflow-x-auto m-auto w-351px tablet:min-w-[680px] pc:min-w-[964px]"
      ref={scrollContainerRef}
    >
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            {tableHeaders.map(({ className, label }, index) => (
              <th key={index} className={className}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.items.map(({ item }) => {
            const { id, shop, notice, status } = item;
            const { name } = shop.item;
            const { hourlyPay, workhour, startsAt } = notice.item;
            const formattedSchedule = FormatUtils.workSchedule(
              startsAt,
              workhour
            ).formattedSchedule;
            const formattedPay = FormatUtils.price(hourlyPay);

            return (
              <tr key={id}>
                <td
                  className={`${baseTdStyle} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0px pl-8px`}
                >
                  {name}
                </td>
                <td
                  className={`${baseTdStyle} min-w-162px tablet:min-w-[300px] pl-8px`}
                >
                  {formattedSchedule}
                </td>
                <td className={`${baseTdStyle} min-w-162px pl-8px`}>
                  {formattedPay}원
                </td>
                <td
                  className={`${baseTdStyle} min-w-162px tablet:min-w-[220px] pc:w-236px pl-12px`}
                >
                  <StatusBadge status={status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
