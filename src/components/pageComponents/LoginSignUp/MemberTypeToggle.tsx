import MemberTypeButton from './MemberTypeButton';

interface UserTypeProps {
  userType: 'employee' | 'employer';
  onClick: (type: 'employee' | 'employer') => void;
}

const memberTypeButtons = [
  {
    type: 'employee',
    label: '알바님',
  },
  {
    type: 'employer',
    label: '사장님',
  },
];

export default function MemberTypeToggle({ userType, onClick }: UserTypeProps) {
  return (
    <div className="flex flex-col items-start pb-18px">
      <span className="font-medium text-gray-600 mb-8px">회원 유형</span>
      <div className="flex items-center justify-between w-full gap-16px">
        {memberTypeButtons.map((button) => (
          <MemberTypeButton
            key={button.type}
            userType={button.type as 'employee' | 'employer'}
            isButtonClicked={userType === button.type}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
