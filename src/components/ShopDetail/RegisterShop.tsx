import LinkButton from '../Button/LinkButton';

export default function RegisterShop() {
  return (
    <div className="flex-col w-full border border-solid flex-center py-60px border-gray20 rounded-12px gap-24px">
      <p>내 가게를 소개하고 공고도 등록해 보세요.</p>
      <LinkButton className="button_large_active" href="/">
        내 가게 등록하기
      </LinkButton>
    </div>
  );
}
