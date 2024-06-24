function EmployeeTable() {
  //임시데이터
  const mockData = [
    {
      id: 1,
      shopName: 'HS 과일주스',
      startsAt: '2023-01-12 10:00 ~ 12:00',
      hourlyPay: '15,000원',
      supportStatus: 'accepted',
      workhour: '2시간',
    },
    {
      id: 2,
      shopName: '써니 브런치 레스토랑',
      startsAt: '2023-01-12 10:00 ~ 12:00',
      hourlyPay: '15,000원',
      supportStatus: 'accepted',
      workhour: '2시간',
    },
    {
      id: 3,
      shopName: '수리 에스프레소 샵',
      startsAt: '2023-01-12 10:00 ~ 12:00',
      hourlyPay: '15,000원',
      supportStatus: 'rejected',
      workhour: '2시간',
    },
    {
      id: 4,
      shopName: '너구리네 라면집',
      startsAt: '2023-01-12 10:00 ~ 12:00',
      hourlyPay: '15,000원',
      supportStatus: 'pending',
      workhour: '2시간',
    },
    {
      id: 5,
      shopName: '초가을집',
      startsAt: '2023-01-12 10:00 ~ 12:00',
      hourlyPay: '15,000원',
      supportStatus: 'pending',
      workhour: '2시간',
    },
  ];

  const baseThStyle =
    'border-gray20 border-1px bg-red10 text-left h-40px text-12px tablet:text-14px pc:text-14px';
  const baseTdStyle =
    'border-gray20 border-1px bg-white h-46px tablet:h-69px pc:h-69px text-14px tablet:text-16px pc:text-16px';

  interface TableHeader {
    label: string;
    className: string;
  }

  const tableHeaders: TableHeader[] = [
    {
      label: '가게',
      className:
        'min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0 p-0 pl-8px',
    },
    {
      label: '일자',
      className: 'min-w-162px tablet:min-w-[300px] pc:w-300px pl-8px',
    },
    {
      label: '시급',
      className: 'min-w-162px pl-8px',
    },
    {
      label: '상태',
      className: 'min-w-162px tablet:min-w-[220px] pc:w-236px pl-12px',
    },
  ];

  return (
    <div className="border-1px border-gray20 rounded-tr-10px rounded-tl-10px overflow-x-auto m-auto w-351px tablet:min-w-[680px] pc:min-w-[964px]">
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            {tableHeaders.map(({ className, label }, index) => (
              <th key={index} className={`${baseThStyle} ${className}`}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData.map(
            (
              { shopName, startsAt, hourlyPay, supportStatus, workhour },
              id
            ) => (
              <tr key={id}>
                <td
                  className={`${baseTdStyle} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0px pl-8px`}
                >
                  {shopName}
                </td>
                <td
                  className={`${baseTdStyle} min-w-162px tablet:min-w-[300px] pl-8px`}
                >
                  {startsAt} ({workhour})
                </td>
                <td className={`${baseTdStyle} min-w-162px pl-8px`}>
                  {hourlyPay}
                </td>
                <td
                  className={`${baseTdStyle} min-w-162px tablet:min-w-[220px] pc:w-236px pl-12px`}
                >
                  {supportStatus}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
