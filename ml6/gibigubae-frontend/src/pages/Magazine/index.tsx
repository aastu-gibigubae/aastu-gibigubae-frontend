import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, Button, ImagePlaceholder } from '@components/ui';
import { useFeaturedIssue, usePastIssues } from '@features/magazine/hooks/useMagazine';

export default function Magazine() {
  const { data: featured, isLoading: loadingFeatured } = useFeaturedIssue();
  const { data: pastIssues, isLoading: loadingPast } = usePastIssues();

  return (
    <PageContainer className="py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Magazine' }]} />
      <h1 className="mt-3 font-heading text-2xl text-primary-dark">Monthly Magazine</h1>

      <div className="mt-6 rounded-2xl border border-primary-dark/10 p-6">
        {loadingFeatured && <p className="text-sm text-primary-dark/50">Loading latest issue…</p>}
        {featured && (
          <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
            <div className="relative overflow-hidden rounded-xl">
              <ImagePlaceholder aspect="aspect-[3/4]" />
              <div className="absolute inset-x-0 bottom-0 bg-primary-dark/90 p-3 text-white">
                <p className="text-xs text-white/70">{featured.coverLabel}</p>
                <p className="font-heading text-sm uppercase">{featured.title}</p>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-2xl text-primary-dark">{featured.title.replace('THE TITLE OF THE MAGAZINE', 'The book name Issue #2')}</h2>
              <p className="mt-2 text-sm text-primary-dark/50">{featured.releasedLabel}</p>
              <p className="mt-4 text-sm leading-relaxed text-primary-dark/70">{featured.description}</p>
              <Button variant="primary" className="mt-6">
                Read Now
              </Button>
            </div>
          </div>
        )}
      </div>

      <h2 className="mt-14 font-heading text-xl text-primary-dark">Past Issues</h2>
      {loadingPast && <p className="mt-4 text-sm text-primary-dark/50">Loading past issues…</p>}
      {pastIssues && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {pastIssues.map((issue) => (
            <div key={issue.id} className="flex gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
              <ImagePlaceholder aspect="aspect-[3/4]" className="w-24 shrink-0" />
              <div className="flex flex-col justify-center">
                <h3 className="font-heading text-base text-primary-dark">{issue.description}</h3>
                <p className="mt-1 text-xs text-primary-dark/50">{issue.coverLabel}</p>
                <Button variant="outline" size="sm" className="mt-4 w-fit">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
