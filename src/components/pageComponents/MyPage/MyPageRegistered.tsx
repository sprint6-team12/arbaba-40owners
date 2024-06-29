import React, { useState, useEffect } from 'react';
import LinkButton from '@/components/Button/LinkButton';
import EmployeeTable, { EmployeeTableData } from '@/components/Table/EmployeeTable';
import userAPI from '@/lib/api/userAPI';
import { MyPageProfileData } from '@/types/MyPage';
import MyPageProfile from './MyPageProfile';

export default function MyPageRegistered({
  profileData,
}: {
  profileData: MyPageProfileData;
}) {
  const [employeeTableData, setEmployeeTableData] =
    useState<EmployeeTableData | null>(null);
  const [hasApplications, setHasApplications] = useState(false);

  useEffect(() => {
    const fetchEmployeeTableData = async () => {
      if (profileData) {
        const data = await userAPI.getUserData(profileData.id);
        if (data && data.applications) {
          setEmployeeTableData(data.applications);
          setHasApplications(data.applications.length > 0);
        }
      }
    };

    fetchEmployeeTableData();
  }, [profileData]);

  return (
    <div className="px-40px tablet:px-60px pc:px-[245px] py-12px tablet:py-32px pc:py-60px">
      <div className="pc:flex justify-between gap-10px mb-60px">
        <span className="font-[700] text-20px tablet:text-28px pc:text-28px text-nowrap">
          내 프로필
        </span>
        <MyPageProfile ProfileData={profileData} />
      </div>
      <span className="font-[700] text-20px tablet:text-28px pc:text-28px">
        신청 내역
      </span>

      {hasApplications && employeeTableData ? (
        <div className="mt-32px w-full">
          <EmployeeTable data={employeeTableData} />
        </div>
      ) : (
        <div className="border rounded-12px w-full h-195px tablet:h-217px pc:h-217px">
          <div className="text-center px-24px py-60px">
            <span className="font-[400] text-14px tablet:text-16px pc:text-16px">
              아직 신청 내역이 없어요.
            </span>
            <div className="flex-center mt-16px tablet:mt-24px pc:mt-24px">
              <LinkButton href="/" className="button_large_active text-nowrap">
                공고 보러가기
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
