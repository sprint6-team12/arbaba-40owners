import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: () => void;
  type?: 'button' | 'submit';
}

function getClassName(
  className: string | undefined,
  disabled: boolean
): string {
  const classMap: Record<string, string> = {
    button_large: disabled ? 'button_large_active' : 'button_large_disActive',
    button_medium: disabled
      ? 'button_medium_active'
      : 'button_medium_disActive',
    button_small: disabled ? 'button_small_active' : 'button_small_disActive',
    button_large_fill: disabled
      ? 'button_large_active flex-1'
      : 'button_large_disActive flex-1',
  };

  return classMap[className ?? ''] ?? className ?? '';
}

function LinkButton({
  children,
  className,
  href,
  onClick,
  onSubmit,
  disabled = false,
  type = 'button',
}: ButtonLinkProps) {
  const finalClassName = getClassName(className, disabled);

  const buttonProps = {
    className: finalClassName,
    onClick,
    onSubmit,
    type,
  };

  return (
    <>
      {disabled ? (
        <Link href={href}>
          <button {...buttonProps}>{children}</button>
        </Link>
      ) : (
        <button {...buttonProps}>{children}</button>
      )}
    </>
  );
}

export default LinkButton;
