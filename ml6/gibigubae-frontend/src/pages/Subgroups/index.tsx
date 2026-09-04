import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, ImagePlaceholder } from '@components/ui';
import { useSubgroups } from '@features/subgroups/hooks/useSubgroups';
import { SubgroupCard } from '@features/subgroups/components/SubgroupCard';

export default function Subgroups() {
  const { data: subgroups, isLoading, isError } = useSubgroups();

  return (
    <div>
      <div className="relative overflow-hidden bg-ink text-white">
        <ImagePlaceholder aspect="aspect-video" tone="dark" className="absolute inset-0 h-full w-full rounded-none opacity-40" />
        <PageContainer className="relative py-14">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Subgroups' }]} />
          <h1 className="mt-4 font-heading text-3xl">
            Our <span className="text-accent">Subgroups</span>
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Expand your knowledge about our church community and the groups that make it up.
          </p>
        </PageContainer>
      </div>

      <PageContainer className="py-10">
        {isLoading && <p className="py-12 text-center text-sm text-primary-dark/50">Loading subgroups…</p>}
        {isError && (
          <p className="py-12 text-center text-sm text-red-500">Couldn't load subgroups right now. Please try again.</p>
        )}
        {subgroups && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subgroups.map((subgroup) => (
              <SubgroupCard key={subgroup.id} subgroup={subgroup} />
            ))}
          </div>
        )}
      </PageContainer>
    </div>
  );
}
