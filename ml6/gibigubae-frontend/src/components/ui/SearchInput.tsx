import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onSearch?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { onSearch, className, ...rest },
  ref,
) {
  return (
    <form
      role="search"
      className={clsx('flex overflow-hidden rounded-lg border border-primary-dark/15 bg-white', className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.();
      }}
    >
      <input
        ref={ref}
        type="search"
        className="w-full min-w-0 px-4 py-2.5 text-sm font-body text-primary-dark outline-none placeholder:text-primary-dark/40"
        {...rest}
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex w-11 shrink-0 items-center justify-center bg-primary-dark text-white transition-colors hover:bg-primary"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
          <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
});
