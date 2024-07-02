import SignUpForm from './SignUpForm';

export default function SignUpFormContainer({
  isSignUp,
  onSignUpSuccess,
}: {
  isSignUp: boolean;
  onSignUpSuccess: () => void;
}) {
  return (
    <div
      className={`flex-center w-full p-10 transition-transform duration-500 ease-in-out ${isSignUp ? '' : 'translate-x-full collapse'}`}
    >
      <SignUpForm onSignUpSuccess={onSignUpSuccess} />
    </div>
  );
}
