import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { ImagePlaceholder, buttonStyles } from '@components/ui';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <ImagePlaceholder aspect="aspect-video" tone="dark" className="absolute inset-0 h-full w-full rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden="true" />

      <PageContainer className="relative py-20 sm:py-28">
        <h1 className="max-w-xl font-heading text-4xl leading-tight sm:text-5xl">
          Building Faith.
          <br />
          <span className="text-accent">Transforming</span> Generation.
        </h1>
        <p className="mt-4 max-w-md font-body text-white/80">
          AASTU Gibi Gubae is a spiritual community that nurtures faith, leadership, and service among university
          students through worship, fellowship, and impactful ministry.
        </p>
        <Link to="/about" className={buttonStyles({ variant: 'outlineAccent', pill: true, className: 'mt-6' })}>
          About Us
        </Link>
      </PageContainer>
    </section>
  );
}
