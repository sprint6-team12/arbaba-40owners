import SmallArrowIcon from '/public/images/icon-arrow-up-small.svg';
import LargeArrowIcon from '/public/images/icon-arrow-up-large.svg';

interface RateBadgeProps {
  rate: number;
}

function RateBadge({ rate }: RateBadgeProps) {
  //rate 숫자의 범위를 정해서 범위에 해당하는 배경색, 글자색을 넣어주는 함수
  //함수로 반환된 값을 클래스로 전달
  const rateMap = [
    {
      range: [0, 0],
      backgroundColor: 'tablet:bg-gray20 pc:bg-gray20',
      textColor: 'text-gray20',
    },
    {
      range: [1, 29],
      backgroundColor: 'tablet:bg-red20 pc:bg-red20',
      textColor: 'text-red20',
    },
    {
      range: [30, 60],
      backgroundColor: 'tablet:bg-red30 pc:bg-red30',
      textColor: 'text-red30',
    },
    {
      range: [61, 100],
      backgroundColor: 'tablet:bg-red40 pc:bg-red40',
      textColor: 'text-red40',
    },
  ];

  //rate에 따라 rateMap에서 지정한 범위에 해당하는 값을 반환
  function getColorForRate(rate: number) {
    for (const rangeItem of rateMap) {
      const [min, max] = rangeItem.range;
      if (rate >= min && rate <= max) {
        return {
          backgroundColor: rangeItem.backgroundColor,
          textColor: rangeItem.textColor,
        };
      }
    }
    // Default color if rate is out of range
    return {
      backgroundColor: '',
      textColor: 'text-white',
    };
  }

  const colors = getColorForRate(rate);

  return (
    <span
      className={`${colors.textColor} ${colors.backgroundColor} tablet:rounded-20px pc:rounded-20px tablet:px-16px pc:px-16px tablet:py-8px pc:py-8px tablet:text-white pc:text-white  h-18px tablet:h-36px pc:h-36px text-12px tablet:text-14px pc:text-14px font-bold inline-flex items-center gap-2px`}
    >
      기존 시급보다 {rate}%
      <SmallArrowIcon
        className={`${colors.textColor} tablet:hidden pc:hidden`}
      />
      <LargeArrowIcon className={`hidden tablet:block pc:block`} />
    </span>
  );
}

export default RateBadge;
