import useColorByRate from '@/hooks/useColorByRate';
import { IconSmallArrow, IconLargeArrow } from '@/utils/Icons';
interface RateBadgeProps {
  rate: number;
  bgNone?: boolean;
}

function RateBadge({ rate, bgNone }: RateBadgeProps) {
  const { backgroundColor, textColor } = useColorByRate(rate);

  return (
    <span
      className={`${bgNone ? textColor : 'text-white'} ${bgNone ? '' : backgroundColor} rounded-20px tablet:rounded-20px pc:rounded-20px px-8px tablet:px-16px pc:px-16px py-12px tablet:py-8px pc:py-8px tablet:text-white pc:text-white h-24px tablet:h-36px pc:h-36px text-12px tablet:text-14px pc:text-14px font-bold inline-flex items-center gap-2px`}
    >
      기존 시급보다 {rate}%
      <IconSmallArrow
        className={`${bgNone && textColor} tablet:hidden pc:hidden`}
      />
      <IconLargeArrow
        className={`${bgNone && textColor} hidden tablet:block pc:block`}
      />
    </span>
  );
}

export default RateBadge;
