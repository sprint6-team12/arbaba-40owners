import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ToggleContainer from './ToggleContainer';

export default function LoginSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="relative flex justify-between w-full max-w-4xl mx-auto overflow-hidden bg-white shadow-lg rounded-3xl">
        <div
          className={`w-full p-10 transition-transform duration-500 ease-in-out ${isSignUp ? '-translate-x-full' : ''}`}
        >
          <SignInForm />
        </div>
        <div
          className={`w-full p-10 transition-transform duration-500 ease-in-out ${isSignUp ? '' : 'translate-x-full'}`}
        >
          <SignUpForm onSignUpSuccess={toggleSignUp} />
        </div>
        <ToggleContainer isSignUp={isSignUp} onToggle={toggleSignUp} />
      </div>
    </div>
  );
}
