interface DropdownOptionsProps {
  toggleOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

function DropdownOptions({
  toggleOpen,
  onClick: handleOptionClick,
}: DropdownOptionsProps) {
  const optionBaseStyles =
    'cursor-pointer text-14px flex-center h-40px hover:font-bold select-none';

  const options = [
    {
      value: '마감임박순',
      className: 'rounded-t-6px border-b-1px border-b-gray20',
    },
    { value: '시급많은순', className: 'border-b-1px border-b-gray20' },
    { value: '시간적은순', className: 'border-b-1px border-b-gray20' },
    { value: '가나다순', className: 'rounded-b-6px' },
  ];

  return (
    <>
      {toggleOpen && (
        <ul
          className={`z-20 absolute top-34px w-105px h-160px bg-white rounded-6px border-1px border-gray20`}
          onClick={handleOptionClick}
        >
          {options.map(({ className, value }, index) => (
            <li
              key={index}
              className={`${className} ${optionBaseStyles}`}
              data-value={value}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default DropdownOptions;
