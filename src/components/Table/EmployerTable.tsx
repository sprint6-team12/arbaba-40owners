export interface EmployerTableData {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: EmployerTableItem[];
  links: EmployerTableLink[];
}

interface EmployerTableItem {
  item: EmployerTableApplication;
  links: EmployerTableLink[];
}

interface EmployerTableLink {
  description: string;
  href: string;
  method: string;
  rel: string;
}

interface EmployerTableUser {
  item: EmployerTableUserData;
  href: string;
}

interface EmployerTableUserData {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string; // optional
  phone?: string; // optional
  address?: string; // optional
  bio?: string; // optional
}

interface EmployerTableShop {
  item: EmployerTableShopData;
  href: string;
}

interface EmployerTableShopData {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface EmployerTableNotice {
  item: EmployerTableNoticeData;
  href: string;
}

interface EmployerTableNoticeData {
  id: string;
  hourlyPay: number;
  description: string;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

interface EmployerTableApplication {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  user: EmployerTableUser;
  shop: EmployerTableShop;
  notice: EmployerTableNotice;
}

interface EmployerTableProps {
  data: EmployerTableData;
}

function EmployerTable({ data }: EmployerTableProps) {
  const baseThStyle = `border-gray20 border-1px bg-red10 text-left h-40px text-12px tablet:text-14px pc:text-14px`;
  const baseTdStyle = `border-gray20 border-1px text-14px tablet:text-16px pc:text-16px bg-white`;

  const tableHeaders = [
    {
      label: '신청자',
      className: `${baseThStyle} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0 p-0 pl-8px`,
    },
    {
      label: '소개',
      className: `${baseThStyle} min-w-162px tablet:min-w-[300px] pc:w-300px pl-8px`,
    },
    {
      label: '전화번호',
      className: `${baseThStyle} min-w-162px pl-8px`,
    },
    {
      label: '상태',
      className: `${baseThStyle} min-w-162px tablet:min-w-[220px] pc:w-236px pl-12px`,
    },
  ];
  return (
    <div className="border-1px border-gray20 rounded-tr-10px rounded-tl-10px overflow-x-auto m-auto w-351px tablet:min-w-[680px] pc:min-w-[964px]">
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
            const { id, status, user, notice } = item;
            const { name, phone } = user.item;
            const { description } = notice.item;

            return (
              <tr key={id}>
                <td
                  className={`${baseTdStyle} min-w-189px tablet:min-w-[228px] pc:w-228px h-46px sticky left-0 pl-8px z-10`}
                >
                  {name}
                </td>
                <td
                  className={`${baseTdStyle} min-w-262px tablet:min-w-[300px] pc:w-300px h-46px tablet:h-91px pc:h-91px pl-8px tablet:py-20px tablet:px-16px pc:py-20px pc:px-16px`}
                >
                  <p className="line-clamp-2">{description}</p>
                </td>
                <td className={`${baseTdStyle} min-w-162px h-46px pl-8px`}>
                  {phone}
                </td>
                <td
                  className={`${baseTdStyle} min-w-162px tablet:min-w-[220px] pc:w-236px h-46px pl-12px`}
                >
                  {status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployerTable;
