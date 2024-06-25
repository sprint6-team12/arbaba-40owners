import SmallArrowIcon from '/public/images/icon-arrow-up-small.svg';
import LargeArrowIcon from '/public/images/icon-arrow-up-large.svg';
import useColorByRate from '@/hooks/useColorByRate';
interface RateBadgeProps {
  rate: number;
}

function RateBadge({ rate }: RateBadgeProps) {
  const { backgroundColor, textColor } = useColorByRate(rate);

  return (
    <span
      className={`${textColor} ${backgroundColor} tablet:rounded-20px pc:rounded-20px tablet:px-16px pc:px-16px tablet:py-8px pc:py-8px tablet:text-white pc:text-white  h-18px tablet:h-36px pc:h-36px text-12px tablet:text-14px pc:text-14px font-bold inline-flex items-center gap-2px`}
    >
      기존 시급보다 {rate}%
      <SmallArrowIcon className={`${textColor} tablet:hidden pc:hidden`} />
      <LargeArrowIcon className={`hidden tablet:block pc:block`} />
    </span>
  );
}

export default RateBadge;
