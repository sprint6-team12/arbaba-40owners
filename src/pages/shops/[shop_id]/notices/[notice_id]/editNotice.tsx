import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import EditNoticeInput from '@/components/pageComponents/AddNotice/EditNoticeInput';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { userState } from '@/recoil/atoms/AuthAtom';

export default function AddNotice() {
  const { shopId } = useRecoilValue(userState);
  return (
    <div className="px-40px tablet:px-60px pc:px-[238px] py-12px tablet:py-32px pc:py-60px">
      <div className="flex justify-between">
        <span className="font-[700] text-20px tablet:text-28px pc:text-28px mb-24px">
          공고 등록
        </span>
        <Link href={`/shops/${shopId}`}>
          <IconCloseBlack aria-label="닫기" />
        </Link>
      </div>
      <EditNoticeInput />
    </div>
  );
}
