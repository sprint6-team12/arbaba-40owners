const BASE_TH_STYLE =
  'border-gray20 border-1px bg-red10 text-left h-40px text-12px tablet:text-14px pc:text-14px';

const TABLE_HEADERS = [
  {
    label: '가게',
    className: `${BASE_TH_STYLE} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0px p-0 pl-8px`,
  },
  {
    label: '일자',
    className: `${BASE_TH_STYLE} min-w-102px tablet:min-w-[300px] pc:w-300px pl-8px`,
  },
  {
    label: '시급',
    className: `${BASE_TH_STYLE} min-w-162px pl-8px`,
  },
  {
    label: '상태',
    className: `${BASE_TH_STYLE} min-w-102px tablet:min-w-[220px] pc:w-236px pl-12px`,
  },
];

function EmployeeTableHeader() {
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

export default EmployeeTableHeader;
