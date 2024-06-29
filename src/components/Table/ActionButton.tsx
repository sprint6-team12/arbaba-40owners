interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function ActionButton({ ...rest }: ActionButtonProps) {
  const styleBase =
    'tablet:font-bold pc:font-bold border-1px flex-center w-69px tablet:w-92px pc:w-92px h-32px tablet:h-38px pc:h-38px text-12px tablet:text-14px pc:text-14px rounded-6px';

  return (
    <div className="flex-center gap-8px">
      <button
        {...rest}
        className={`${styleBase} border-custom-orange text-custom-orange`}
      >
        거절하기
      </button>
      <button {...rest} className={`${styleBase} border-blue20 text-blue20`}>
        승인하기
      </button>
    </div>
  );
}

export default ActionButton;
