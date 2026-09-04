import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { ImagePlaceholder, buttonStyles } from '@components/ui';
import { missionVisionValues } from '../mockData';

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <ImagePlaceholder aspect="aspect-video" tone="dark" className="absolute inset-0 h-full w-full rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden="true" />

      <PageContainer className="relative pb-24 pt-14 sm:pb-32">
        <p className="font-body text-sm uppercase tracking-wide text-accent">About Us</p>
        <h1 className="mt-3 max-w-xl font-heading text-4xl leading-tight sm:text-5xl">
          Rooted in Faith.
          <br />
          Committed to <span className="text-accent">Generations.</span>
        </h1>
        <p className="mt-4 max-w-md font-body text-white/80">
          AASTU Gibi Gubae is a spiritual community that nurtures faith, leadership, and service among university
          students through worship, fellowship, and impactful ministry.
        </p>
        <Link to="/login" className={buttonStyles({ variant: 'outlineAccent', pill: true, className: 'mt-6' })}>
          Login
        </Link>
      </PageContainer>

      <div className="relative z-10 -mb-16 sm:-mb-20">
        <PageContainer>
          <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg sm:grid-cols-3 sm:p-8">
            {missionVisionValues.map((item) => (
              <div key={item.id}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-dark/10 text-primary-dark">
                  <CrossIcon className="h-4 w-4" />
                </span>
                <h3 className="mt-3 font-heading text-sm text-primary-dark">{item.title}</h3>
                <span className="mt-1 block h-0.5 w-8 bg-accent" />
                <p className="mt-2 text-xs leading-relaxed text-primary-dark/60">{item.text}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>
    </section>
  );
}

function CrossIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M10 3v14M4 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
