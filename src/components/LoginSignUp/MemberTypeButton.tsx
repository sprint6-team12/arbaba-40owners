import IconChecked from '@/../public/images/checked.svg';

export interface TypeButtonProps {
  userType: 'employee' | 'employer';
  isButtonClicked: boolean;
  onClick: (type: 'employee' | 'employer') => void;
}

export default function MemberTypeButton({
  userType,
  isButtonClicked,
  onClick,
}: TypeButtonProps) {
  return (
    <button
      type="button"
      className={`px-16px py-8px border rounded-30px w-full ${
        isButtonClicked
          ? 'border-red-500 text-red-500'
          : 'border-gray-300 text-gray-500'
      } flex items-center justify-center`}
      onClick={() => onClick(userType)}
    >
      {isButtonClicked && (
        <div className="m-0 w-18px h-18px mr-10px rounded-30px flex-center border border-solid border-[#cbc9cf] bg-[#ea3c12]">
          <IconChecked width="14" height="14" />
        </div>
      )}
      {userType === 'employee' ? '알바님' : '사장님'}
    </button>
  );
}
