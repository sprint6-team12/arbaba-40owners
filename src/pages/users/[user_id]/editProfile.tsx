import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import MyPageInput from '@/components/pageComponents/MyPage/MyPageInput';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { userState } from '@/recoil/atoms/AuthAtom';

export default function EditProfile() {
  const userId = useRecoilValue(userState);
  const router = useRouter();
  const handleClose = () => {
    router.push(`/users/${userId}`);
  };
  return (
    <div className="px-[10px] tablet:px-[16px] pc:px-[60px] py-[3px] tablet:py-[8px] pc:py-[15px]">
      <div className="flex justify-between items-center gap-[3px]">
        <span className="font-bold text-[20px] tablet:text-[28px] pc:text-[28px]">
          내 프로필
        </span>
        <button onClick={handleClose}>
          <IconCloseBlack alt="닫기" />
        </button>
      </div>
      <MyPageInput />
    </div>
  );
}
