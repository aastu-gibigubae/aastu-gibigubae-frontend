import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** Toggleable chip used for category filters (e.g. "All / Bible / Theology / Language"). */
export function Pill({ active = false, className, type = 'button', ...rest }: PillProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={clsx(
        'rounded-full border px-4 py-1.5 text-sm font-body transition-colors',
        active
          ? 'border-primary-dark bg-primary-dark text-white'
          : 'border-primary-dark/20 bg-white text-primary-dark hover:border-primary-dark/40',
        className,
      )}
      {...rest}
    />
  );
}
