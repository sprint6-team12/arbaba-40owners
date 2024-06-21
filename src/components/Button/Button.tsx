import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className: string;
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: () => void;
  type?: 'button' | 'submit';
}

function Button({
  children,
  className,
  onClick,
  onSubmit,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  let ClassName = className;

  if (className === 'large_active') {
    ClassName = disabled ? 'button_large_active' : 'button_large_disActive';
  } else if (className === 'medium_active') {
    ClassName = disabled ? 'button_medium_active' : 'button_medium_disActive';
  } else if (className === 'small_active') {
    ClassName = disabled ? 'button_small_active' : 'button_small_disActive';
  } else {
    ClassName = className;
  }

  return (
    <>
      <button
        className={ClassName}
        onClick={onClick}
        onSubmit={onSubmit}
        type={type}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
