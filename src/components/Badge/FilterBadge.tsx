import DeleteIcon from '/public/images/icon-close-orange.svg';

interface FilterBadgeProps {
  onClick?: () => void;
  children: string;
}

function FilterBadge({ onClick, children }: FilterBadgeProps) {
  return (
    <span
      className={`px-10px py-6px rounded-20px font-bold text-14px text-custom-orange tablet:text-14px pc:text-14px inline-flex justify-center items-center gap-4px bg-red10`}
    >
      {children}
      <DeleteIcon className="cursor-pointer" onClick={onClick} />
    </span>
  );
}

export default FilterBadge;
