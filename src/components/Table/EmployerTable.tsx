import { useEffect, useRef } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import EmployerBody from './EmployerTableBody';
import EmployerHeader from './EmployerTableHeader';

interface EmployerTableProps {
  data: ApplicationListResponseData;
}

function EmployerTable({ data }: EmployerTableProps) {
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
      className="border-1px border-gray20 rounded-tr-10px rounded-tl-10px overflow-x-auto m-auto min-w-[351px] w-full"
      ref={scrollContainerRef}
    >
      <table className="table-auto min-w-full">
        <EmployerHeader />
        <EmployerBody items={data.items} />
      </table>
    </div>
  );
}

export default EmployerTable;
