import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';
import type { FieldTone } from './Input';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  tone?: FieldTone;
  options: SelectOption[];
  placeholder?: string;
}

const TONE_CLASSES: Record<FieldTone, string> = {
  light: 'bg-white border border-primary-dark/15 text-primary-dark focus:border-primary',
  dark: 'bg-primary-dark/40 border border-white/10 text-white focus:border-accent',
};

const CHEVRON_TONE_CLASSES: Record<FieldTone, string> = {
  light: 'text-primary-dark/50',
  dark: 'text-white/60',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, tone = 'light', options, placeholder, id, className, defaultValue, ...rest },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className={clsx('text-sm font-body', tone === 'dark' ? 'text-white/80' : 'text-primary-dark/80')}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          defaultValue={defaultValue ?? ''}
          className={clsx(
            'w-full appearance-none rounded-lg px-4 py-2.5 pr-9 text-sm font-body outline-none transition-colors',
            TONE_CLASSES[tone],
            error && 'border-red-500 focus:border-red-500',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className={clsx('pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2', CHEVRON_TONE_CLASSES[tone])}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && (
        <p id={`${selectId}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});
