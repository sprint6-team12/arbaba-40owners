import { useState, forwardRef } from 'react';
import BaseInput from '@/components/Input/BaseInput';
import IconEye from '/public/images/icon-eye.svg';
import IconEyeOff from '/public/images/icon-eye-off.svg';

function InputPassword(
  { className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={`relative input-base ${className}`}>
      <BaseInput
        type={isPasswordVisible ? 'text' : 'password'}
        ref={ref}
        {...rest}
      />
      <button
        type="button"
        onClick={handleTogglePasswordVisibility}
        className="absolute -translate-x-full h-24px w-24px bg-transparent"
      >
        {isPasswordVisible ? <IconEyeOff /> : <IconEye />}
      </button>
    </div>
  );
}

forwardRef(InputPassword).displayName = 'InputPassword';

export default forwardRef(InputPassword);
