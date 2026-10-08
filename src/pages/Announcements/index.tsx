import { useState } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, Pagination } from '@components/ui';
import { useAnnouncements } from '@features/announcements/hooks/useAnnouncements';

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
const dayFormatter = new Intl.DateTimeFormat('en-US', { day: 'numeric' });

export default function Announcements() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useAnnouncements(page);

  return (
    <PageContainer className="py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Announcement' }]} />
      <h1 className="mt-3 font-heading text-2xl text-primary-dark">Announcements</h1>
      <p className="mt-2 max-w-xl text-sm text-primary-dark/60">
        Stay informed with the latest official news, deadlines, and events from across the AASTU campus community.
      </p>

      <div className="mt-8 space-y-4">
        {isLoading && <p className="py-12 text-center text-sm text-primary-dark/50">Loading announcements…</p>}
        {isError && <p className="py-12 text-center text-sm text-red-500">Couldn't load announcements right now.</p>}
        {data && data.items.length === 0 && (
          <p className="py-12 text-center text-sm text-primary-dark/50">No announcements right now.</p>
        )}
        {data?.items.map((item) => {
          const posted = new Date(item.created_at);
          return (
            <div key={item.id} className="flex gap-4 rounded-xl border border-primary-dark/10 p-5">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-surface text-primary-dark">
                <span className="text-xs font-medium uppercase">{monthFormatter.format(posted)}</span>
                <span className="font-heading text-lg leading-none">{dayFormatter.format(posted)}</span>
              </div>
              <div>
                <h3 className="font-heading text-base text-primary-dark">{item.title}</h3>
                <p className="mt-1 text-sm text-primary-dark/60">{item.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {data && data.items.length > 0 && (
        <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} className="mt-10" />
      )}
    </PageContainer>
  );
}
