import LinkButton from '@/components/Button/LinkButton';
import { IconLocation, IconPhone } from '@/lib/utils/Icons';
import { MyPageProfileData } from '@/types/MyPage';

export default function MyPageProfile({
  ProfileData,
}: {
  ProfileData: MyPageProfileData;
}) {
  return (
    <div className="flex justify-between border-none rounded-12px w-full pc:w-[665px] p-20px tablet:p-32px pc:p-32px bg-red10 mt-16px">
      <div className="flex flex-col gap-8px tablet:gap-12px">
        <div>
          <p className="text-custom-orange text-14px font-[700]">이름</p>
          <h2 className="text-24px font-[700] mt-8px">{ProfileData.name}</h2>
        </div>
        <div className="flex items-center gap-6px text-gray50">
          <IconPhone />
          {ProfileData.phone}
        </div>
        <div className="flex items-center gap-6px text-gray50">
          <IconLocation />
          선호지역: {ProfileData.address}
        </div>
        <div className="mt-12px">{ProfileData.bio}</div>
      </div>
      <div className="w-108px tablet:w-169px pc:w-169px">
        <LinkButton href="/" className="w-full button_medium_disActive">
          편집하기
        </LinkButton>
      </div>
    </div>
  );
}
