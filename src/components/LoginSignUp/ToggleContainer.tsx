import Button from '../Button/Button';

type ToggleContainerProps = {
  isSignUp: boolean;
  onToggle: () => void;
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

const ToggleContainer = ({ isSignUp, onToggle }: ToggleContainerProps) => {
  const content = isSignUp ? signUp : signIn;

  return (
    <div
      className={`absolute top-0 left-1/2 w-1/2 h-full p-5 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
        isSignUp ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <>
        <h1 className="mb-4 text-xl font-bold">{content.title}</h1>
        <p className="mb-8">{content.text}</p>
        <Button className="button_medium_active" onClick={onToggle}>
          {content.sign}
        </Button>
      </>
    </div>
  );
};

export default ToggleContainer;
