import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { Card, ImagePlaceholder, buttonStyles } from '@components/ui';
import { images } from '@/assets/images';
import { useFeaturedIssue } from '@features/magazine/hooks/useMagazine';
import { useAnnouncements } from '@features/announcements/hooks/useAnnouncements';

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export function MagazineAndAnnouncements() {
  const { data: featured, isLoading: loadingMagazine } = useFeaturedIssue();
  const { data: announcementsPage, isLoading: loadingAnnouncements } = useAnnouncements(1);
  const announcements = announcementsPage?.items.slice(0, 4) ?? [];

  return (
    <section className="bg-surface py-14">
      <PageContainer className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-xl text-primary-dark">Magazines</h2>
            <Link to="/magazine" className="text-sm font-body text-primary hover:underline">
              Full archive →
            </Link>
          </div>
          {loadingMagazine && <p className="mt-6 text-sm text-primary-dark/50">Loading…</p>}
          {featured && (
            <div className="mt-6 max-w-xs">
              <Card media={<ImagePlaceholder src={featured.cover_image ?? images.threeSaintsIcon} alt={featured.title} />}>
                <h3 className="font-heading text-sm uppercase text-primary-dark">{featured.title}</h3>
                <Link
                  to="/magazine"
                  className={buttonStyles({ variant: 'primary', size: 'sm', fullWidth: true, className: 'mt-4' })}
                >
                  Read more
                </Link>
              </Card>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-xl text-primary-dark">Latest Announcements</h2>
            <Link to="/announcements" className="text-sm font-body text-primary hover:underline">
              See all notice →
            </Link>
          </div>
          {loadingAnnouncements && <p className="mt-6 text-sm text-primary-dark/50">Loading…</p>}
          <ul className="mt-6 space-y-3">
            {announcements.map((item) => (
              <li key={item.id} className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm">
                <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-primary-dark/5 text-xs font-body text-primary-dark/70">
                  {dateFormatter.format(new Date(item.created_at))}
                </span>
                <p className="text-sm text-primary-dark">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}
