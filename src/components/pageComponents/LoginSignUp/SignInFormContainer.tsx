import SignInForm from './SignInForm';

export default function SignInFormContainer({
  isSignUp,
  onClose,
  isMobile,
}: {
  isSignUp: boolean;
  isMobile: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={`flex-center w-full p-10 transition-transform ease-in-out${isMobile ? ' duration-300' : ' duration-500'}${isMobile ? (isSignUp ? ' scale-0' : ' scale-1') : isSignUp ? ' -translate-x-full collapse' : ''}`}
    >
      <SignInForm onClose={onClose} />
    </div>
  );
}
