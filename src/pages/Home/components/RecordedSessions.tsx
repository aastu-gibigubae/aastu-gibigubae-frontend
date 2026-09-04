import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { ImagePlaceholder } from '@components/ui';
import { recordedSessions } from '../mockData';

export function RecordedSessions() {
  return (
    <section className="bg-primary-dark py-14 text-white">
      <PageContainer>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-xl">Recorded Sessions</h2>
            <p className="mt-1 text-sm text-white/60">
              Catch up on missed lectures, guest speakers, and spiritual reflections from our video library
            </p>
          </div>
          <Link to="/magazine" className="whitespace-nowrap text-sm font-body text-accent hover:underline">
            view more →
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {recordedSessions.map((session) => (
            <div key={session.id} className="overflow-hidden rounded-2xl bg-white/5">
              <ImagePlaceholder tone="dark" className="rounded-none" />
              <div className="p-4">
                <h3 className="font-heading text-sm">{session.title}</h3>
                <p className="mt-1 text-xs text-white/60">{session.speaker}</p>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
