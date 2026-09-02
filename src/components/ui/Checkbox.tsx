import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, className, ...rest },
  ref,
) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <label htmlFor={checkboxId} className="flex items-center gap-2 text-sm font-body text-primary-dark/80 cursor-pointer">
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        className={clsx(
          'h-4 w-4 rounded border-primary-dark/30 text-primary focus:ring-primary/40',
          className,
        )}
        {...rest}
      />
      {label}
    </label>
  );
});
