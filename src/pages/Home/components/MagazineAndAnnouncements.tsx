import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { Card, ImagePlaceholder, buttonStyles } from '@components/ui';
import { latestAnnouncements, latestMagazine } from '../mockData';

export function MagazineAndAnnouncements() {
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
          <div className="mt-6 max-w-xs">
            <Card media={<ImagePlaceholder />}>
              <p className="text-xs text-primary-dark/50">{latestMagazine.issueLabel}</p>
              <h3 className="mt-1 font-heading text-sm uppercase text-primary-dark">{latestMagazine.title}</h3>
              <Link
                to="/magazine"
                className={buttonStyles({ variant: 'primary', size: 'sm', fullWidth: true, className: 'mt-4' })}
              >
                Read more
              </Link>
            </Card>
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-xl text-primary-dark">Latest Announcements</h2>
            <Link to="/contact" className="text-sm font-body text-primary hover:underline">
              See all notice →
            </Link>
          </div>
          <ul className="mt-6 space-y-3">
            {latestAnnouncements.map((item) => (
              <li key={item.id} className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm">
                <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-primary-dark/5 text-xs font-body text-primary-dark/70">
                  {item.date}
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
