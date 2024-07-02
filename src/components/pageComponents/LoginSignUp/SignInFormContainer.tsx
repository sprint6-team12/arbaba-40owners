import SignInForm from './SignInForm';

export default function SignInFormContainer({
  isSignUp,
  onClose,
}: {
  isSignUp: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={`flex-center w-full p-10 transition-transform duration-500 ease-in-out ${isSignUp ? '-translate-x-full collapse' : ''}`}
    >
      <SignInForm onClose={onClose} />
    </div>
  );
}
