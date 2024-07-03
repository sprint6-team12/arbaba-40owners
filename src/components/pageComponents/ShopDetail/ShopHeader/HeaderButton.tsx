import { useRecoilValue } from 'recoil';
import LinkButton from '@/components/Button/LinkButton';
import { userState } from '@/recoil/atoms/AuthAtom';

export default function HeaderButton() {
  const { shopId } = useRecoilValue(userState);


  return (
    <>
      <LinkButton
        className="w-full text-center button_medium_disActive"
        href={`/shops/${shopId}/edit`} // 가게 정보 등록 페이지로 가게정보 props 내려줘야할듯
      >
        편집하기
      </LinkButton>
      <LinkButton
        className="w-full text-center button_medium_active"
        href={`/shops/${shopId}/notices`} // 가게 정보 등록 페이지
      >
        공고 등록하기
      </LinkButton>
    </>
  );
}
