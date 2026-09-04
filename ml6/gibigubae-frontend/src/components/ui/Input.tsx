import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export type FieldTone = 'light' | 'dark';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  tone?: FieldTone;
}

const TONE_CLASSES: Record<FieldTone, string> = {
  light: 'bg-white border border-primary-dark/15 text-primary-dark placeholder:text-primary-dark/40 focus:border-primary',
  dark: 'bg-primary-dark/40 border border-white/10 text-white placeholder:text-white/50 focus:border-accent',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, tone = 'light', id, className, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className={clsx('text-sm font-body', tone === 'dark' ? 'text-white/80' : 'text-primary-dark/80')}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          'w-full rounded-lg px-4 py-2.5 text-sm font-body outline-none transition-colors',
          TONE_CLASSES[tone],
          error && 'border-red-500 focus:border-red-500',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});
