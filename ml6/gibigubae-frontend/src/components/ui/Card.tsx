import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Content that sits above the padded body, e.g. <ImagePlaceholder /> with a <Badge /> overlay. */
  media?: ReactNode;
}

export function Card({ media, children, className, ...rest }: CardProps) {
  return (
    <div className={clsx('overflow-hidden rounded-2xl bg-white shadow-sm', className)} {...rest}>
      {media && <div className="relative">{media}</div>}
      <div className="p-4">{children}</div>
    </div>
  );
}
