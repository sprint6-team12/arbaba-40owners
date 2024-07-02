import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import LinkButton from '@/components/Button/LinkButton';
import MyPageProfile from '@/components/pageComponents/MyPage/MyPageProfile';
import { UserInfo } from '@/lib/api/userAPI';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { userState } from '@/recoil/atoms/AuthAtom';

interface MyPageRegisteredProps {
  profileData: UserInfo;
}

export default function MyPageRegistered({
  profileData,
}: MyPageRegisteredProps) {
  const [isEditing, setIsEditing] = useState(false);
  // const [hasApplications, setHasApplications] = useState(false);
  const router = useRouter();
  const userId = useRecoilValue(userState);

  const handleEditClick = () => {
    router.push(`/users/${userId}/editProfile`);
  };
  const handleCloseClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="px-[10px] tablet:px-[16px] pc:px-[60px] py-[3px] tablet:py-[8px] pc:py-[15px]">
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
        <div className="mt-[8px] mb-[8px]">
          <span className="font-bold text-[20px] tablet:text-[28px] pc:text-[28px]">
            신청 내역
          </span>
        </div>
        {/* {hasApplications ? ( */}
        <div className="mt-[8px] w-full">
          {/* <EmployeeTable data={dummyEmployeeTableData} /> */}
        </div>
        {/* ) : ( */}
        <div className="border rounded-[3px] w-full h-[48px] tablet:h-[54px] pc:h-[54px] flex flex-col justify-center items-center">
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
        {/* )} */}
      </>
    </div>
  );
}
