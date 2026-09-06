import { useState } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, Pagination } from '@components/ui';
import { useRecordedSessions } from '@features/media/hooks/useRecordedSessions';
import { RecordedSessionCard } from '@features/media/components/RecordedSessionCard';

export default function RecordedSessions() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useRecordedSessions(page);

  return (
    <PageContainer className="py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Recorded Sessions' }]} />
      <h1 className="mt-3 font-heading text-2xl text-primary-dark">Recorded Sessions</h1>
      <p className="mt-2 max-w-xl text-sm text-primary-dark/60">
        Access the digital archive of past events, lectures, and workshops organized by AASTU Gibi Gubae.
      </p>

      <div className="mt-8">
        {isLoading && <p className="py-12 text-center text-sm text-primary-dark/50">Loading sessions…</p>}
        {isError && (
          <p className="py-12 text-center text-sm text-red-500">Couldn't load recorded sessions right now.</p>
        )}
        {data && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((session) => (
                <RecordedSessionCard key={session.id} session={session} />
              ))}
            </div>
            <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} className="mt-10" />
          </>
        )}
      </div>
    </PageContainer>
  );
}
