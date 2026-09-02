import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

type BadgeTone = 'onImage' | 'neutral';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  // Sits on top of a photo (event/course category tag) — semi-opaque white chip.
  onImage: 'bg-white/85 text-primary-dark backdrop-blur-sm',
  neutral: 'bg-primary/10 text-primary',
};

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-body',
        TONE_CLASSES[tone],
        className,
      )}
      {...rest}
    />
  );
}
