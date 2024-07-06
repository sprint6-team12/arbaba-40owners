import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MyPageProfile from '@/components/pageComponents/MyPage/MyPageProfile';
import NoData from '@/components/pageComponents/ShopDetail/NoData';
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
          if (result.items && result.items.length > 0) {
            setData(result);
          } else {
            setData(null);
          }
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
    <div className="px-40px tablet:px-60px pc:px-[350px] py-12px tablet:py-32px pc:py-60px w-957px">
      <div className="pc:flex mb-60px pc:w-957px">
        <span className="font-[700] text-20px tablet:text-28px pc:text-28px text-nowrap mr-190px">
          내 프로필
        </span>
        {isEditing && (
          <button onClick={handleCloseClick}>
            <IconCloseBlack aria-label="닫기" />
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
            <div className="[&_>div]:w-full">
              <EmployeeTable data={data} />
            </div>
            <div className="bg-white border-1px h-64px flex-center rounded-b-10px">
              <Pagination
                count={data.count}
                limit={limit}
                currentPage={currentPage}
                hasNext={data.hasNext}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <NoData
            title="아직 신청 내역이 없어요."
            text="공고 보러가기"
            href="/"
          />
        )}
      </div>
    </div>
  );
}
