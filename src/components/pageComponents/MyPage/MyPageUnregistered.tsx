import { useState } from 'react';
import Button from '@/components/Button/Button';
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
      <div className="flex justify-between">
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
        <div className="border rounded-12px w-full h-195px tablet:h-217px pc:h-217px mt-16px">
          <div className="text-center px-24px py-60px">
            <span className="font-[400] text-14px tablet:text-16px pc:text-16px">
              내 프로필을 등록하고 원하는 가게에 지원해 보세요.
            </span>
            <div className="flex-center mt-16px tablet:mt-24px pc:mt-24px">
              <Button
                onClick={() => setShowInputForm(true)}
                className="button_large_active text-nowrap"
              >
                내 프로필 등록 하기
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <MyPageInput />
        </div>
      )}
    </div>
  );
}
