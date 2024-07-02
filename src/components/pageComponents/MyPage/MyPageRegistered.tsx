import { useRouter } from 'next/router';
import { useState } from 'react';
import LinkButton from '@/components/Button/LinkButton';
import MyPageProfile from '@/components/pageComponents/MyPage/MyPageProfile';
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
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/users/${userId}/editProfile`);
  };
  const handleCloseClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="px-[10px] tablet:px-[16px] pc:px-[60px] py-[3px] tablet:py-[8px] pc:py-[15px] mb-80px">
      <div className="flex justify-between items-center gap-[2.5px]">
        <span className="font-bold text-[20px] tablet:text-[28px] pc:text-[28px]">
          내 프로필
        </span>
        {isEditing && (
          <button onClick={handleCloseClick}>
            <IconCloseBlack alt="닫기" />
          </button>
        )}
      </div>
      <>
        <MyPageProfile ProfileData={profileData} onClick={handleEditClick} />
        <div className="mt-40px mb-16px">
          <span className="font-bold text-[20px] tablet:text-[28px] pc:text-[28px]">
            신청 내역
          </span>
        </div>
        <div className="mt-[8px] w-full">
          {/* <EmployeeTable data={data} /> */}
        </div>
        <div className="border rounded-12px w-full h-195px tablet:h-217px pc:h-217px flex flex-col justify-center items-center">
          <div className="text-center px-[6px] py-[15px]">
            <span className="font-normal text-[14px] tablet:text-[16px] pc:text-[16px]">
              아직 신청 내역이 없어요.
            </span>
            <div className="flex justify-center mt-[4px] tablet:mt-[6px] pc:mt-[6px]">
              <LinkButton href="/" className="button_large_active text-nowrap">
                공고 보러가기
              </LinkButton>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
