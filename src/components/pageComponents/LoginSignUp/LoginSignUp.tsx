import { useState } from 'react';
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

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="flex-center">
      <div className="relative flex justify-between tablet:w-[700px] pc:w-[900px] mx-auto overflow-x-hidden rounded-24px">
        <SignInFormContainer isSignUp={isSignUp} onClose={onClose} />
        <SignUpFormContainer
          isSignUp={isSignUp}
          onSignUpSuccess={toggleSignUp}
        />
        <ToggleContainer isSignUp={isSignUp} onToggle={toggleSignUp} />
      </div>
    </div>
  );
}
