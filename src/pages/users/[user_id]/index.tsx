import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import MyPageRegistered from '@/components/pageComponents/MyPage/MyPageRegistered';
import MyPageUnregistered from '@/components/pageComponents/MyPage/MyPageUnregistered';
import { getUserData, UserInfo } from '@/lib/api/userAPI';
import { userState } from '@/recoil/atoms/AuthAtom';

export default function MyPage() {
  const { userId, type } = useRecoilValue(userState);
  const [profileData, setProfileData] = useState<UserInfo | null>(null);
  const router = useRouter();
  const setAuthState = useSetRecoilState(userState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          alert('사용자 Id가 없습니다.');
          router.push('/login');
          return;
        }
        const response = await getUserData(userId, type, setAuthState);
        setProfileData(response.item);
      } catch (error) {
        alert('사용자 데이터를 가져오는 중 오류가 발생했습니다.');
        router.push('/');
      }
    };

    fetchUserData();
  }, [userId]);

  const isProfileDataValid = (data: UserInfo | null): data is UserInfo => {
    return data !== null && !!data.name && !!data.phone;
  };

  return (
    <div>
      {isProfileDataValid(profileData) ? (
        <MyPageRegistered profileData={profileData} userId={userId} />
      ) : (
        <MyPageUnregistered userId={userId} />
      )}
    </div>
  );
}
