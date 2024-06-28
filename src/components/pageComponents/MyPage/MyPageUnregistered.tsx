import { useState } from 'react';
import ShopNoData from '@/components/ShopDetail/ShopNoData';
import { IconCloseBlack } from '@/utils/Icons';
import MyPageInput from './MyPageInput';

export default function MyPageUnregistered({
  userProfileData,
}: {
  userProfileData: FormData | undefined;
}) {
  const [showInputForm, setShowInputForm] = useState(false);

  return (
    <div className="px-40px tablet:px-60px pc:px-[238px] py-12px tablet:py-32px pc:py-60px">
      <div className="flex justify-between mb-16px">
        <span className="font-[700] text-20px tablet:text-28px pc:text-28px">
          내 프로필
        </span>
        {showInputForm && (
          <button onClick={() => setShowInputForm(false)}>
            <IconCloseBlack alt="닫기" />
          </button>
        )}
      </div>
      {!userProfileData && !showInputForm ? (
        <ShopNoData
          title="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
          text="내 프로필 등록하기"
        /> //내프로필등록하기버튼누르면입력폼이떠야됨
      ) : (
        <div>
          <MyPageInput />
        </div>
      )}
    </div>
  );
}
