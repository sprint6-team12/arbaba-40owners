import applicationAPI from '@/lib/api/applicationAPI';
import removePrefix from '@/lib/utils/RemovePrefix';

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
}

function ActionButton({ href, ...rest }: ActionButtonProps) {
  const BASE_STYLE =
    'tablet:font-bold pc:font-bold border-1px flex-center w-69px tablet:w-92px pc:w-92px h-32px tablet:h-38px pc:h-38px text-12px tablet:text-14px pc:text-14px rounded-6px';

  const APPLY_RESPONSE_MAP: { [key: string]: string } = {
    accepted: '승인',
    rejected: '거절',
  };

  const handleClick = (event: React.MouseEvent) => {
    const { value } = event.target as HTMLButtonElement;
    alert(`지원 요청을 ${APPLY_RESPONSE_MAP[value]}합니다.`);
    const cleanUrl = removePrefix(href);
    applicationAPI.putShopApply(cleanUrl, value);
  };

  return (
    <div className="flex-center gap-8px w-122px tablet:min-w-162px pc:min-w-200px ml-8px tablet:m-auto pc:m-auto">
      <button
        className={`${BASE_STYLE} border-custom-orange text-custom-orange`}
        onClick={handleClick}
        value="rejected"
        {...rest}
      >
        거절하기
      </button>
      <button
        className={`${BASE_STYLE} border-blue20 text-blue20`}
        onClick={handleClick}
        value="accepted"
        {...rest}
      >
        승인하기
      </button>
    </div>
  );
}

export default ActionButton;
