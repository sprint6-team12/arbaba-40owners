import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LinkButton from '@/components/Button/LinkButton';
import MyPageProfile from '@/components/pageComponents/MyPage/MyPageProfile';
import Pagination from '@/components/Pagination/Pagination';
import EmployeeTable, {
  EmployeeTableData,
} from '@/components/Table/EmployeeTable';
import applicationAPI from '@/lib/api/applicationAPI';
import { UserInfo } from '@/lib/api/userAPI';
import { IconCloseBlack } from '@/lib/utils/Icons';

interface MyPageRegisteredProps {
  profileData: UserInfo;
  userId: string | null;
}

export default function MyPageRegistered({
  userId,
  profileData,
}: MyPageRegisteredProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<EmployeeTableData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const result = await applicationAPI.getUserApply({
            user_id: userId,
            offset: (currentPage - 1) * limit,
            limit: limit,
          });
          setData(result);
        } catch (error) {
          alert(error);
        }
      }
    };

    fetchData();
  }, [userId, currentPage]);

  const handleEditClick = () => {
    router.push(`/users/${userId}/editProfile`);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-40px tablet:px-60px pc:px-[250px] py-12px tablet:py-32px pc:py-60px">
      <div className="pc:flex pc:justify-between gap-10px mb-60px">
        <span className="font-[700] text-20px tablet:text-28px pc:text-28px text-nowrap pc:mr-180px">
          내 프로필
        </span>
        {isEditing && (
          <button onClick={handleCloseClick}>
            <IconCloseBlack alt="닫기" />
          </button>
        )}
        <MyPageProfile ProfileData={profileData} onClick={handleEditClick} />
      </div>

      <div className="mt-40px mb-16px">
        <span className="font-bold text-[20px] tablet:text-[28px] pc:text-[28px]">
          신청 내역
        </span>
      </div>
      <div className="mt-[8px] w-full">
        {data ? (
          <>
            <div className="[&_>div]:w-full mb-12px">
              <EmployeeTable data={data} />
            </div>
            <Pagination
              count={data.count}
              limit={limit}
              currentPage={currentPage}
              hasNext={data.hasNext}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="border rounded-12px w-full h-195px tablet:h-217px pc:h-217px flex flex-col justify-center items-center">
            <div className="text-center px-[6px] py-[15px]">
              <span className="font-normal text-[14px] tablet:text-[16px] pc:text-[16px]">
                아직 신청 내역이 없어요.
              </span>
              <div className="flex justify-center mt-[4px] tablet:mt-[6px] pc:mt-[6px]">
                <LinkButton
                  href="/"
                  className="button_large_active text-nowrap"
                >
                  공고 보러가기
                </LinkButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
