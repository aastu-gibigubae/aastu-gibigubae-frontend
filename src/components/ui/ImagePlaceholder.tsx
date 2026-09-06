import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  /** Tailwind aspect-ratio utility, e.g. "aspect-video", "aspect-square". */
  aspect?: string;
  /** Set true for circular avatar-style placeholders (leadership photos, logo). */
  round?: boolean;
  /** 'dark' for use on dark section backgrounds (e.g. Recorded Sessions) — keeps the glyph visible. */
  tone?: 'light' | 'dark';
  /** Real image source — when provided, renders an actual <img> instead of the placeholder glyph. */
  src?: string;
  /** Required alongside `src` for accessibility; ignored otherwise. */
  alt?: string;
}

const TONE_CLASSES = {
  light: 'bg-primary-dark/10 text-primary-dark/30',
  dark: 'bg-white/10 text-white/40',
} as const;

/**
 * Flat gray block with a simple image glyph by default — used everywhere a
 * real photo or video thumbnail doesn't exist yet. Pass `src` (+ `alt`) to
 * render a real photo instead; the aspect/round/className framing stays
 * identical either way, so call sites can adopt real images one at a time
 * without touching layout.
 */
export function ImagePlaceholder({
  aspect = 'aspect-video',
  round = false,
  tone = 'light',
  src,
  alt = '',
  className,
  ...rest
}: ImagePlaceholderProps) {
  const shapeClasses = round ? 'aspect-square rounded-full' : clsx(aspect, 'rounded-lg');

  if (src) {
    return (
      <div className={clsx('w-full overflow-hidden', shapeClasses, className)} {...rest}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={clsx('flex w-full items-center justify-center', TONE_CLASSES[tone], shapeClasses, className)}
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
