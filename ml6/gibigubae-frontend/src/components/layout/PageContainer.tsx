import type { ReactNode } from 'react';
import clsx from 'clsx';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /** Set false for full-bleed sections (e.g. hero banners) that manage their own width. */
  padded?: boolean;
}

/**
 * Shared width/gutter wrapper so every page lines up on the same grid.
 * Keep page-specific layout (grids, stacks) inside the page itself —
 * this only owns max-width + horizontal padding.
 */
export function PageContainer({ children, className, padded = true }: PageContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-7xl',
        padded && 'px-4 sm:px-6 lg:px-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
