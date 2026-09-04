import { useParams } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, ImagePlaceholder } from '@components/ui';
import { useSubgroup } from '@features/subgroups/hooks/useSubgroups';

export default function SubgroupDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: subgroup, isLoading, isError } = useSubgroup(slug);

  if (isLoading) {
    return <PageContainer className="py-16 text-center text-sm text-primary-dark/50">Loading…</PageContainer>;
  }

  if (isError || !subgroup) {
    return (
      <PageContainer className="py-16 text-center">
        <p className="text-sm text-red-500">We couldn't find that subgroup.</p>
      </PageContainer>
    );
  }

  return (
    <div>
      <ImagePlaceholder aspect="aspect-[21/9]" className="rounded-none" />
      <PageContainer className="py-10">
        <Breadcrumb
          items={[{ label: 'Home', to: '/' }, { label: 'Subgroups', to: '/subgroups' }, { label: subgroup.name }]}
        />
        <h1 className="mt-4 font-heading text-3xl text-primary-dark">{subgroup.name}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-dark/70">{subgroup.description}</p>

        <h2 className="mt-8 font-heading text-lg text-primary-dark">Sub-groups</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {subgroup.subSubgroups.map((name, index) => (
            <li key={index} className="flex items-center gap-2 rounded-lg bg-surface px-4 py-3 text-sm text-primary-dark/80">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent text-primary-dark">
                <CheckIcon className="h-3 w-3" />
              </span>
              {name}
            </li>
          ))}
        </ul>
      </PageContainer>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
