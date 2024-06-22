import GnbUiButton from './GnbUiButton';
import NotificationButton from './NotificationBUtton';

interface Button {
  name: string;
  id: string;
}

interface GnbButtonProps {
  userType?: 'employee' | 'employer' | 'guest';
  handleClick: (pathname: string) => void;
  hasNotification?: boolean;
}

const GUEST_BUTTONS: Button[] = [
  { name: '로그인', id: 'signin' },
  { name: '회원가입', id: 'signup' },
];

const EMPLOYER_BUTTONS: Button[] = [
  { name: '내 가게', id: 'my-shop' },
  { name: '로그아웃', id: 'logout' },
];

const EMPLOYEE_BUTTONS: Button[] = [
  { name: '내 프로필', id: 'my-profile' },
  { name: '로그아웃', id: 'logout' },
];

export default function GnbButton({
  userType,
  handleClick,
  hasNotification = false,
}: GnbButtonProps) {
  const renderButtons = (buttons: Button[]) =>
    buttons.map((button) => (
      <GnbUiButton
        key={button.id}
        name={button.name}
        id={button.id}
        handleClickButton={() => handleClick(button.id)}
      />
    ));

  return (
    <div>
      {userType === 'guest' && renderButtons(GUEST_BUTTONS)}
      {userType === 'employer' && (
        <>
          {renderButtons(EMPLOYER_BUTTONS)}
          {hasNotification !== undefined && (
            <NotificationButton hasNotification={hasNotification} />
          )}
        </>
      )}
      {userType === 'employee' && (
        <>
          {renderButtons(EMPLOYEE_BUTTONS)}
          {hasNotification !== undefined && (
            <NotificationButton hasNotification={hasNotification} />
          )}
        </>
      )}
    </div>
  );
}
