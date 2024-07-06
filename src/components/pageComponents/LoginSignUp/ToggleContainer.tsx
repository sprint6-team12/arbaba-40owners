import Image from 'next/image';
import Button from '@/components/Button/Button';
import Logo from '/public/images/logo.png';

type ToggleContainerProps = {
  isSignUp: boolean;
  onToggle: () => void;
  isMobile: boolean;
};

const signUp = {
  title: '아이디가 이미 있으신가요?',
  text: '아래 버튼을 눌러 로그인을 해주세요.',
  sign: '로그인',
};

const signIn = {
  title: '아이디가 없으신가요?',
  text: '아래 버튼을 눌러 회원가입을 해주세요.',
  sign: '회원가입',
};

const ToggleContainer = ({
  isSignUp,
  onToggle,
  isMobile,
}: ToggleContainerProps) => {
  const content = isSignUp ? signUp : signIn;

  const ToggleButton = () => (
    <Button
      className={`button_medium_active${isMobile ? ' mb-20px' : ''}`}
      onClick={onToggle}
    >
      {content.sign}
    </Button>
  );

  if (isMobile) {
    return ToggleButton();
  }

  return (
    <div
      className={`absolute top-0 left-1/2 w-1/2 h-full p-20px flex-center flex-col transition-transform duration-500 ease-in-out ${
        isSignUp ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <>
        <Image src={Logo} className="mb-16px" alt="더줄게 로고" />
        <h1 className="text-xl font-bold mb-16px">{content.title}</h1>
        <p className="mb-32px">{content.text}</p>
        {ToggleButton()}
      </>
    </div>
  );
};

export default ToggleContainer;
