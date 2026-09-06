import type { ReactNode } from 'react';
import { PageContainer } from './PageContainer';
import { ImagePlaceholder } from '@components/ui';

interface PageHeroProps {
  image: string;
  imageAlt: string;
  children: ReactNode;
  /** Shorter banner for detail pages that don't need the full breadcrumb+title+subtitle stack. */
  compact?: boolean;
}

export function PageHero({ image, imageAlt, children, compact = false }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-ink text-white">
      <ImagePlaceholder
        aspect="aspect-video"
        tone="dark"
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full rounded-none opacity-40"
      />
      <PageContainer className={`relative ${compact ? 'py-10' : 'py-14'}`}>{children}</PageContainer>
    </div>
  );
}
