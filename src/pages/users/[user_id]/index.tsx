import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import MyPageRegistered from '@/components/pageComponents/MyPage/MyPageRegistered';
import MyPageUnregistered from '@/components/pageComponents/MyPage/MyPageUnregistered';
import userAPI from '@/lib/api/userAPI';
import { userState } from '@/recoil/atoms/AuthAtom';
import { MyPageProfileData } from '@/types/MyPage';

export default function MyPage() {
  const user = useRecoilValue(userState);
  const [profileData, setProfileData] = useState<MyPageProfileData | null>(
    null
  );

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.id) {
        return;
      }
      const data = await userAPI.getUserData(user.id);

      if (data) {
        setProfileData(data);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      {profileData ? (
        <MyPageRegistered profileData={profileData} />
      ) : (
        <MyPageUnregistered />
      )}
    </div>
  );
}
