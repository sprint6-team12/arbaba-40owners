import EmployerBody from './EmployerTableBody';
import EmployerHeader from './EmployerTableHeader';

interface EmployerTableProps {
  data: ApplicationListResponseData;
}

function EmployerTable({ data }: EmployerTableProps) {
  return (
    <div className="border-1px border-gray20 rounded-tr-10px rounded-tl-10px overflow-x-auto m-auto min-w-[351px] w-full">
      <table className="table-auto min-w-full">
        <EmployerHeader />
        <EmployerBody items={data.items} />
      </table>
    </div>
  );
}

export default EmployerTable;
