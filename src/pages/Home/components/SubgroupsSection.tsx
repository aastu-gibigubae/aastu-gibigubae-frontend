import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { ImagePlaceholder, buttonStyles } from '@components/ui';
import { featuredSubgroup } from '../mockData';

export function SubgroupsSection() {
  return (
    <section className="py-14">
      <PageContainer>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-xl text-primary-dark">Our Subgroups</h2>
            <p className="mt-1 text-sm text-primary-dark/60">Expand your knowledge about our church</p>
          </div>
          <Link to="/subgroups" className="text-sm font-body text-primary hover:underline">
            View all →
          </Link>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl">
          <ImagePlaceholder aspect="aspect-[21/9]" className="rounded-none" />

          <div className="absolute inset-y-0 left-0 flex w-full max-w-sm items-center p-4 sm:p-8">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="font-heading text-lg text-primary-dark">{featuredSubgroup.name}</h3>
              <p className="mt-2 text-sm text-primary-dark/60">{featuredSubgroup.description}</p>
              <ul className="mt-4 space-y-2">
                {featuredSubgroup.subSubgroups.map((name, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-primary-dark/80">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent text-primary-dark">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {name}
                  </li>
                ))}
              </ul>
              <Link
                to="/subgroups"
                className={buttonStyles({ variant: 'outline', size: 'sm', className: 'mt-5' })}
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
