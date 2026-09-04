import clsx from 'clsx';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Windowed page list (current ±1, plus first/last) with "…" gaps once there
 * are enough pages to need them — the reference screenshots only show 3
 * pages, but event/course lists will grow well past that.
 */
export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageList(page, totalPages);

  return (
    <nav aria-label="Pagination" className={clsx('flex items-center justify-center gap-2', className)}>
      <PageButton
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronIcon direction="left" />
      </PageButton>

      {pages.map((entry, index) =>
        entry === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-1 text-primary-dark/40">
            …
          </span>
        ) : (
          <PageButton
            key={entry}
            active={entry === page}
            onClick={() => onPageChange(entry)}
            aria-current={entry === page ? 'page' : undefined}
          >
            {entry}
          </PageButton>
        ),
      )}

      <PageButton
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronIcon direction="right" />
      </PageButton>
    </nav>
  );
}

function getPageList(page: number, totalPages: number): Array<number | 'ellipsis'> {
  const pages: Array<number | 'ellipsis'> = [];
  const window = new Set([1, totalPages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= totalPages));
  const sorted = [...window].sort((a, b) => a - b);

  sorted.forEach((p, index) => {
    if (index > 0 && p - sorted[index - 1] > 1) pages.push('ellipsis');
    pages.push(p);
  });

  return pages;
}

function PageButton({
  active,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={clsx(
        'flex h-8 w-8 items-center justify-center rounded-full border text-sm font-body transition-colors',
        active
          ? 'border-primary-dark bg-primary-dark text-white'
          : 'border-primary-dark/20 text-primary-dark hover:border-primary-dark/40 disabled:opacity-30 disabled:hover:border-primary-dark/20',
        className,
      )}
      {...rest}
    />
  );
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d={direction === 'left' ? 'm12.5 5-5 5 5 5' : 'm7.5 5 5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
