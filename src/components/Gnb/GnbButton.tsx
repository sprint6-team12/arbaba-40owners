import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import GnbUiButton from '@/components/Gnb/GnbUiButton';
import ModalCustom from '@/components/Modal/ModalCustom';
import LoginSignUp from '@/components/pageComponents/LoginSignUp/LoginSignUp';
import { useAuth } from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { userState } from '@/recoil/atoms/AuthAtom';

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

const SpecialModal = ({
  onClose,
  isLogin = false,
}: {
  onClose?: () => void;
  isLogin?: boolean;
}) => (
  <ModalCustom
    content={
      <div className="relative min-w-[480px] border rounded-20px border-gray20 bg-white">
        <LoginSignUp isLogin={isLogin} onClose={onClose} />
        <IconCloseBlack
          className="absolute top-20px right-20px cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        />
      </div>
    }
  />
);

export default function GnbButton({ userType, onClick }: GnbButtonProps) {
  const { openModal } = useModal();
  const { userId, shopId } = useRecoilValue(userState);
  const router = useRouter();
  const { setUser } = useAuth();

  const openLoginModal = (isLogin: boolean) => {
    openModal('LoginSignUpModal', SpecialModal, { isLogin });
  };

  const handleGnbButtonsClick = (buttonId: string) => {
    if (userType === 'guest' || userType === undefined) {
      if (buttonId === 'signup') {
        openLoginModal(true);
      } else if (buttonId === 'signin') {
        openLoginModal(false);
      }
    } else if (userType === 'employer' && buttonId === 'my-shop') {
      router.push(`/shops/${shopId}`);
    } else if (userType === 'employee' && buttonId === 'my-profile') {
      router.push(`/users/${userId}`);
    } else if (buttonId === 'logout') {
      router.replace('/').then(() => {
        localStorage.removeItem('token');
        setUser(null, null, null, 'guest', false, '', '', '');
      });
    } else {
      onClick(buttonId);
    }
  };

  const renderButtons = (buttons: GnbButtonType[]) =>
    buttons.map((button) => (
      <GnbUiButton
        key={button.id}
        name={button.name}
        id={button.id}
        handleClickButton={() => handleGnbButtonsClick(button.id)}
      />
    ));

  let buttonsToRender: GnbButtonType[] = [];

  if (userType === 'guest' || userType === undefined) {
    buttonsToRender = GUEST_BUTTONS;
  } else if (userType === 'employer') {
    buttonsToRender = EMPLOYER_BUTTONS;
  } else if (userType === 'employee') {
    buttonsToRender = EMPLOYEE_BUTTONS;
  }

  return <>{renderButtons(buttonsToRender)}</>;
}
