import { useEffect, useRef } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import EmployeeTableBody from './EmployeeTableBody';
import EmployeeTableHeader from './EmployeeTableHeader';

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

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [isMobile, isTablet]);

  return (
    <div
      className="border-1px border-gray20 rounded-tr-10px rounded-tl-10px overflow-x-auto m-auto w-351px tablet:min-w-[600px] pc:min-w-[940px]"
      ref={scrollContainerRef}
    >
      <table className="table-auto min-w-full">
        <EmployeeTableHeader />
        <EmployeeTableBody items={data.items} />
      </table>
    </div>
  );
}

export default EmployeeTable;
