import Input from '@/components/Input/Input';

const FormGroupWrapper = ({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`relative flex flex-col gap-8px ${className}`}>
    {children}
  </div>
);

const Label = ({
  className = '',
  children,
  ...rest
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={`${className}`} {...rest}>
    {children}
  </label>
);

const InputWrapper = ({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={`relative ${className}`}>{children}</div>;

const ErrorMessage = ({
  className = '',
  errorMessage,
}: {
  className?: string;
  errorMessage: string | null;
}) => {
  return (
    <>
      {errorMessage && (
        <p className={`input-error-message ${className}`}>{errorMessage}</p>
      )}
    </>
  );
};

const FormGroup = Object.assign(FormGroupWrapper, {
  Label: Label,
  InputWrapper: InputWrapper,
  InputField: Input,
  ErrorMessage: ErrorMessage,
});

export default FormGroup;
