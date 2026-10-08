import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, Button, ImagePlaceholder } from '@components/ui';
import { images } from '@/assets/images';
import { useFeaturedIssue, usePastIssues } from '@features/magazine/hooks/useMagazine';

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function Magazine() {
  const { data: featured, isLoading: loadingFeatured, isError: featuredError } = useFeaturedIssue();
  const { data: pastIssues, isLoading: loadingPast } = usePastIssues();

  return (
    <PageContainer className="py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Magazine' }]} />
      <h1 className="mt-3 font-heading text-2xl text-primary-dark">Monthly Magazine</h1>

      <div className="mt-6 rounded-2xl border border-primary-dark/10 p-6">
        {loadingFeatured && <p className="text-sm text-primary-dark/50">Loading latest issue…</p>}
        {featuredError && <p className="text-sm text-red-500">Couldn't load the magazine right now.</p>}
        {featured === null && !loadingFeatured && (
          <p className="text-sm text-primary-dark/50">No issues have been published yet.</p>
        )}
        {featured && (
          <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
            <ImagePlaceholder aspect="aspect-[3/4]" src={featured.cover_image ?? images.threeSaintsIcon} alt={featured.title} />
            <div>
              <h2 className="font-heading text-2xl text-primary-dark">{featured.title}</h2>
              <p className="mt-2 text-sm text-primary-dark/50">Released: {dateFormatter.format(new Date(featured.published_at))}</p>
              {featured.content && <p className="mt-4 text-sm leading-relaxed text-primary-dark/70">{featured.content}</p>}
              <a href={featured.pdf_url} target="_blank" rel="noreferrer">
                <Button variant="primary" className="mt-6">
                  Read Now
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>

      {(pastIssues?.length ?? 0) > 0 && (
        <>
          <h2 className="mt-14 font-heading text-xl text-primary-dark">Past Issues</h2>
          {loadingPast && <p className="mt-4 text-sm text-primary-dark/50">Loading past issues…</p>}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {pastIssues!.map((issue) => (
              <div key={issue.id} className="flex gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
                <ImagePlaceholder
                  aspect="aspect-[3/4]"
                  src={issue.cover_image ?? images.threeSaintsIcon}
                  alt={issue.title}
                  className="w-24 shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-heading text-base text-primary-dark">{issue.title}</h3>
                  <p className="mt-1 text-xs text-primary-dark/50">
                    {dateFormatter.format(new Date(issue.published_at))}
                  </p>
                  <a href={issue.pdf_url} target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" className="mt-4 w-fit">
                      Read More
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </PageContainer>
  );
}
