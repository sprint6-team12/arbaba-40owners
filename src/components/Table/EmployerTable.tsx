function EmployerTable() {
  const mockData = [
    {
      id: 1,
      name: '김경현',
      description:
        '최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보여드리겠습니다.',
      phone: '010-1234-1234',
      supportStatus: 'pending',
    },
    {
      id: 2,
      name: '김경현',
      description:
        '최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보여드리겠습니다.',
      phone: '010-1234-1234',
      supportStatus: 'accepted',
    },
    {
      id: 3,
      name: '김경현',
      description:
        '최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보여드리겠습니다.',
      phone: '010-1234-1234',
      supportStatus: 'rejected',
    },
    {
      id: 4,
      name: '김경현',
      description: '최선을 다해 열심히 일합니다. ',
      phone: '010-1234-1234',
      supportStatus: 'canceled',
    },
  ];

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
          {mockData.map(({ name, description, phone, supportStatus }, id) => (
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
                {supportStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployerTable;
