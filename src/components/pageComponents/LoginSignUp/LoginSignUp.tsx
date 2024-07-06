import { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import SignInFormContainer from './SignInFormContainer';
import SignUpFormContainer from './SignUpFormContainer';
import ToggleContainer from './ToggleContainer';

export default function LoginSignUp({
  isLogin = false,
  onClose,
}: {
  isLogin: boolean;
  onClose?: () => void;
}) {
  const [isSignUp, setIsSignUp] = useState(isLogin);
  const { isMobile } = useMediaQuery();

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className={`flex-center${isMobile ? ' flex-col' : ''}`}>
      <div
        className={`${isMobile ? 'h-[605px] w-320px' : 'relative flex justify-between tablet:w-[700px] pc:w-[900px] mx-auto overflow-x-hidden rounded-24px'}`}
      >
        <SignInFormContainer
          isSignUp={isSignUp}
          onClose={onClose}
          isMobile={isMobile}
        />
        <SignUpFormContainer
          isSignUp={isSignUp}
          onSignUpSuccess={toggleSignUp}
          isMobile={isMobile}
        />
        {!isMobile && (
          <ToggleContainer
            isSignUp={isSignUp}
            onToggle={toggleSignUp}
            isMobile={isMobile}
          />
        )}
      </div>
      {isMobile && (
        <ToggleContainer
          isSignUp={isSignUp}
          onToggle={toggleSignUp}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}
