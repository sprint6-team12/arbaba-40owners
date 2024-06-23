import GnbUiButton from '@/components/Gnb/GnbUiButton';
import NotificationButton from '@/components/Gnb/NotificationButton';

interface GnbButtonType {
  name: string;
  id: string;
}

interface GnbButtonProps {
  userType?: 'employee' | 'employer' | 'guest';
  onClick: (pathname: string) => void;
  hasNotification?: boolean;
}

const GUEST_BUTTONS: GnbButtonType[] = [
  { name: '로그인', id: 'signin' },
  { name: '회원가입', id: 'signup' },
];

const EMPLOYER_BUTTONS: GnbButtonType[] = [
  { name: '내 가게', id: 'my-shop' },
  { name: '로그아웃', id: 'logout' },
];

const EMPLOYEE_BUTTONS: GnbButtonType[] = [
  { name: '내 프로필', id: 'my-profile' },
  { name: '로그아웃', id: 'logout' },
];

export default function GnbButton({
  userType,
  onClick,
  hasNotification = false,
}: GnbButtonProps) {
  const renderButtons = (buttons: GnbButtonType[]) =>
    buttons.map((button) => (
      <GnbUiButton
        key={button.id}
        name={button.name}
        id={button.id}
        handleClickButton={() => onClick(button.id)}
      />
    ));

  const getButtons = () => {
    switch (userType) {
      case 'employer':
        return EMPLOYER_BUTTONS;
      case 'employee':
        return EMPLOYEE_BUTTONS;
      default:
        return GUEST_BUTTONS;
    }
  };

  return (
    <div className="flex justify-between items-center gap-16px tablet:gat-40px pc:gap-40px text-14px tablet:text-16px pc:text-16px font-[700]">
      {renderButtons(getButtons())}
      {userType !== 'guest' && (
        <NotificationButton hasNotification={hasNotification} />
      )}
    </div>
  );
}