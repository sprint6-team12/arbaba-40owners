type UserType = 'employer' | 'employee';

interface TableProps {
  userType: UserType;
}

function Table({ userType }: TableProps) {
  // userType에 따라 2가지 api 호출 중에서 하나를 실행하여 데이터를 전달할 계획

  return (
    <div className="m-16px w-351px overflow-x-auto no-scrollbar">
      <table className="rounded-tr-10px rounded-tl-10px border-1px border-gray20">
        <thead>
          <tr className="text-left h-40px">
            <th className="min-w-200px sticky left-0 bg-red10 pl-8px">가게</th>
            <th className="min-w-162px bg-red10 pl-8px">일자</th>
            <th className="min-w-162px bg-red10 pl-8px">시급</th>
            <th className="min-w-162px bg-red10 pl-12px">상태</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-46px">
            <td className="min-w-200px sticky left-0 bg-white pl-8px">
              HS 과일주스
            </td>
            <td className="min-w-162px pl-8px">
              2023-01-12 10:00 ~ 12:00(2시간)
            </td>
            <td className="min-w-162px pl-8px">15,000원</td>
            <td className="min-w-162px pl-12px">승인완료</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
