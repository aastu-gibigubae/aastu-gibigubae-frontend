import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  /** Tailwind aspect-ratio utility, e.g. "aspect-video", "aspect-square". */
  aspect?: string;
  /** Set true for circular avatar-style placeholders (leadership photos, logo). */
  round?: boolean;
  /** 'dark' for use on dark section backgrounds (e.g. Recorded Sessions) — keeps the glyph visible. */
  tone?: 'light' | 'dark';
}

const TONE_CLASSES = {
  light: 'bg-primary-dark/10 text-primary-dark/30',
  dark: 'bg-white/10 text-white/40',
} as const;

/**
 * Flat gray block with a simple image glyph — used everywhere a real photo
 * or video thumbnail will eventually go. Swap for an <img>/CDN url once the
 * media library feature is wired up; nothing else about the layout should
 * need to change since this fills its parent exactly like an <img> would.
 */
export function ImagePlaceholder({ aspect = 'aspect-video', round = false, tone = 'light', className, ...rest }: ImagePlaceholderProps) {
  return (
    <div
      className={clsx(
        'flex w-full items-center justify-center',
        TONE_CLASSES[tone],
        round ? 'aspect-square rounded-full' : clsx(aspect, 'rounded-lg'),
        className,
      )}
      {...rest}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-1/4 w-1/4 min-h-6 min-w-6" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="10" r="1.75" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 16l5-4.5 3.5 3 4-3.5L21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
