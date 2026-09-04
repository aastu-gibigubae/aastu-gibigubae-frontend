import { PageContainer } from '@components/layout/PageContainer';
import { ImagePlaceholder } from '@components/ui';
import { leaders } from '../mockData';

export function Leadership() {
  return (
    <section className="bg-surface pb-14 pt-24 sm:pt-28">
      <PageContainer>
        <h2 className="text-center font-heading text-2xl text-primary-dark">Our Leadership</h2>
        <p className="mt-2 text-center text-sm text-primary-dark/60">
          Meet the dedicated leaders guiding our community in faith and purpose
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {leaders.map((leader) => (
            <div key={leader.id} className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <ImagePlaceholder round className="mx-auto h-20 w-20" />
              <h3 className="mt-4 font-heading text-sm text-primary-dark">{leader.role}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{leader.name}</p>
              <span className="mx-auto mt-1 block h-0.5 w-8 bg-accent" />
              <p className="mt-3 text-xs leading-relaxed text-primary-dark/60">
                Leading the community with faith and vision, inspiring students to grow in Christ and purpose.
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
