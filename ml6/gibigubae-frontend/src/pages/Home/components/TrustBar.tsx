import { PageContainer } from '@components/layout/PageContainer';
import { trustStats } from '../mockData';

const ICONS = [UsersIcon, CalendarIcon, LayersIcon];

export function TrustBar() {
  return (
    <div className="relative z-10 -mt-10 sm:-mt-14">
      <PageContainer>
        <div className="rounded-2xl bg-surface p-6 shadow-md sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trustStats.map((stat, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <div key={stat.id} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-dark/10 text-primary-dark">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-heading text-lg text-primary-dark">{stat.value}</p>
                    <p className="text-xs text-primary-dark/60">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 19c1-3 3-4.5 5.5-4.5s4.5 1.5 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="8.5" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.5 14.5c2 0 3.6 1.2 4.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 9.5h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
