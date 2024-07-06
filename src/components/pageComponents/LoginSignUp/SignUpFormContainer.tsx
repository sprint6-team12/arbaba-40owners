import SignUpForm from './SignUpForm';

export default function SignUpFormContainer({
  isSignUp,
  onSignUpSuccess,
  isMobile,
}: {
  isSignUp: boolean;
  isMobile: boolean;
  onSignUpSuccess: () => void;
}) {
  return (
    <div
      className={`flex-center w-full p-10 transition-transform ease-in-out${isMobile ? ' duration-300' : ' duration-500'}${isMobile ? ' -translate-y-[67%]' : ''}${isMobile ? (isSignUp ? ' scale-1' : ' scale-0') : isSignUp ? '' : ' translate-x-full collapse'}`}
    >
      <SignUpForm onSignUpSuccess={onSignUpSuccess} />
    </div>
  );
}
