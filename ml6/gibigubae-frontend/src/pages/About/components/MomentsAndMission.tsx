import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { ImagePlaceholder, buttonStyles } from '@components/ui';

export function MomentsOfFaith() {
  return (
    <section className="py-14">
      <PageContainer>
        <h2 className="text-center font-heading text-xl text-primary-dark">Moments of Faith</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ImagePlaceholder aspect="aspect-square" />
          <ImagePlaceholder aspect="aspect-square" />
          <ImagePlaceholder aspect="aspect-square" />
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            className={buttonStyles({ variant: 'outline', pill: true })}
          >
            View more photos
          </button>
        </div>
      </PageContainer>
    </section>
  );
}

export function JoinOurMission() {
  return (
    <section className="pb-14">
      <PageContainer>
        <div className="grid overflow-hidden rounded-2xl bg-ink text-white sm:grid-cols-2">
          <div className="p-8 sm:p-12">
            <span className="block h-0.5 w-10 bg-accent" />
            <h2 className="mt-4 font-heading text-2xl">Join Our Mission</h2>
            <p className="mt-3 max-w-sm text-sm text-white/70">
              Be part of a community that seeks to glorify God and transform lives.
            </p>
            <Link to="/contact" className={buttonStyles({ variant: 'accent', className: 'mt-6' })}>
              Get Involved
            </Link>
          </div>
          <ImagePlaceholder aspect="aspect-video" tone="dark" className="rounded-none" />
        </div>
      </PageContainer>
    </section>
  );
}
