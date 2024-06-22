import { useEffect, useState } from 'react';

function EmployeeTable() {
  //api 호출해서 데이터 받아온다.
  // 우선 mock으로 진행
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

  return (
    <table className="table-auto min-w-full">
      <thead>
        <tr className="text-left h-40px text-12px tablet:text-14px">
          <th className="min-w-189px tablet:min-w-[228px] pc:w-228px border-gray20 border-1px sticky left-0 bg-red10 p-0 pl-8px">
            가게
          </th>
          <th className="border-gray20 border-1px min-w-162px tablet:min-w-[300px] bg-red10 pl-8px">
            일자
          </th>
          <th className="border-gray20 border-1px min-w-162px bg-red10 pl-8px">
            시급
          </th>
          <th className="min-w-162px tablet:min-w-[220px] pc:w-236px border-gray20 border-1px bg-red10 pl-12px">
            상태
          </th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((item) => (
          <tr className="h-46px tablet:h-69px pc:h-69px text-14px tablet:text-16px">
            <td className="min-w-189px tablet:min-w-[228px] pc:w-228px border-gray20 border-1px sticky left-0px bg-white pl-8px">
              {item.shopName}
            </td>
            <td className="border-gray20 border-1px min-w-162px tablet:min-w-[300px] pl-8px">
              <p>
                {item.startsAt} ({item.workhour})
              </p>
            </td>
            <td className="border-gray20 border-1px min-w-162px pl-8px">
              {item.hourlyPay}
            </td>
            <td className="min-w-162px tablet:min-w-[220px] pc:w-236px border-gray20 border-1px pl-12px">
              {item.supportStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

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

  return (
    <table className="table-auto min-w-full">
      <thead>
        <tr className="text-left h-40px text-12px">
          <th className="min-w-189px tablet:min-w-[228px] pc:w-228px border-gray20 border-1px sticky left-0 bg-red10 p-0 pl-8px">
            신청자
          </th>
          <th className="border-gray20 border-1px min-w-162px tablet:min-w-[300px] pc:w-300px bg-red10 pl-8px">
            소개
          </th>
          <th className="border-gray20 border-1px min-w-162px bg-red10 pl-8px">
            전화번호
          </th>
          <th className="min-w-162px tablet:min-w-[220px] pc:w-236px border-gray20 border-1px bg-red10 pl-12px">
            상태
          </th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((item) => (
          <tr className="text-14px tablet:text-16px">
            <td className="min-w-189px tablet:min-w-[228px] pc:w-228px h-46px border-gray20 border-1px sticky left-0 bg-white pl-8px z-10">
              {item.name}
            </td>
            <td className="min-w-262px tablet:min-w-[300px] pc:w-300px h-46px tablet:h-91px pc:h-91px border-gray20 border-1px pl-8px tablet:py-20px tablet:px-16px pc:py-20px pc:px-16px">
              <p className="line-clamp-2">{item.description}</p>
            </td>
            <td className="min-w-162px h-46px border-gray20 border-1px pl-8px">
              {item.phone}
            </td>
            <td className="min-w-162px tablet:min-w-[220px] pc:w-236px h-46px border-gray20 border-1px pl-12px">
              {item.supportStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type UserType = 'employer' | 'employee' | null;

function Table() {
  const [userType, setUserType] = useState<UserType>(null);

  // 유저 타입은 로그인하면 클라이언트에 보관하여 사용할 것으로 예측
  // 따라서 로컬스토리지에서 유저타입을 가져와서 해당하는 타입의 테이블을 랜더링하는 방법으로 구현
  const getUserType = () => {
    const userType = localStorage.getItem('userType');
    return userType as UserType;
  };

  useEffect(() => {
    // 임시로 setItem
    localStorage.setItem('userType', 'employee');
    const userType: UserType = getUserType();
    setUserType(userType);
  }, []);

  if (userType === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="border-1px border-gray20 rounded-tr-10px rounded-tl-10px overflow-x-auto m-auto w-351px tablet:min-w-[680px] pc:min-w-[964px]">
      {userType === 'employer' ? <EmployerTable /> : <EmployeeTable />}
    </div>
  );
}

export default Table;
