const BASE_TH_STYLE = `border-gray20 border-b-2px bg-red10 text-left h-40px text-12px tablet:text-14px pc:text-14px`;
const TABLE_HEADERS = [
  {
    label: '신청자',
    className: `${BASE_TH_STYLE} min-w-162px tablet:min-w-[228px] pc:w-228px sticky left-0 p-0 pl-8px`,
  },
  {
    label: '소개',
    className: `${BASE_TH_STYLE} min-w-162px tablet:min-w-[300px] pc:w-300px pl-8px`,
  },
  {
    label: '전화번호',
    className: `${BASE_TH_STYLE} min-w-142px pl-8px`,
  },
  {
    label: '상태',
    className: `${BASE_TH_STYLE} min-w-160px tablet:min-w-[220px] pc:w-236px pl-8px`,
  },
];

function EmployerTableHeader() {
  return (
    <thead>
      <tr>
        {TABLE_HEADERS.map(({ className, label }, index) => (
          <th key={index} className={className}>
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default EmployerTableHeader;
