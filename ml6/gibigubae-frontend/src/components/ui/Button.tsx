import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'outlineAccent' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  accent: 'bg-accent text-primary-dark font-semibold hover:brightness-95',
  outline: 'bg-transparent text-primary-dark border border-primary-dark/30 hover:bg-primary-dark/5',
  outlineAccent: 'bg-transparent text-accent border border-accent hover:bg-accent hover:text-primary-dark',
  ghost: 'bg-transparent text-primary hover:text-primary-dark underline-offset-4 hover:underline',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1',
  md: 'text-sm px-5 py-2 gap-1.5',
  lg: 'text-base px-7 py-3 gap-2',
};

/**
 * Class-string builder so non-<button> elements (e.g. React Router <Link>)
 * can render with identical button styling — pass the result to `className`.
 */
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  pill = false,
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}) {
  return clsx(
    'inline-flex items-center justify-center font-body transition-colors disabled:opacity-50 disabled:pointer-events-none',
    pill ? 'rounded-full' : 'rounded-lg',
    fullWidth && 'w-full',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant,
  size,
  pill,
  fullWidth,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, pill, fullWidth, className })}
      {...rest}
    />
  );
}
