import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { ImagePlaceholder } from '@components/ui';

export function HistoryBanner() {
  return (
    <section className="py-14">
      <PageContainer>
        <div className="relative overflow-hidden rounded-2xl bg-ink text-white">
          <ImagePlaceholder aspect="aspect-[16/7]" tone="dark" className="absolute inset-0 h-full w-full rounded-none opacity-40" />
          <div className="relative max-w-lg p-8 sm:p-12">
            <h2 className="font-heading text-2xl text-accent">A brief History</h2>
            <p className="mt-4 text-sm text-white/80">
              AASTU Gibi Gubae has grown from a small student fellowship into a spiritual community thousands
              strong — rooted in worship, discipleship, and service to one another.
            </p>
            <Link to="/about" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
              READ MORE
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
