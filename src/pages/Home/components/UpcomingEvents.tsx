import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { useEvents } from '@features/events/hooks/useEvents';
import { EventCard } from '@features/events/components/EventCard';
import { DEFAULT_EVENT_FILTERS } from '@features/events/types';

export function UpcomingEvents() {
  const { data, isLoading } = useEvents(DEFAULT_EVENT_FILTERS, 1);
  const events = data?.items.slice(0, 3) ?? [];

  if (!isLoading && events.length === 0) return null;

  return (
    <section className="py-14">
      <PageContainer>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-xl text-primary-dark">Upcoming Events</h2>
            <p className="mt-1 text-sm text-primary-dark/60">Don't miss out on our latest events.</p>
          </div>
          <Link to="/events" className="text-sm font-body text-primary hover:underline">
            View all
          </Link>
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm text-primary-dark/50">Loading…</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  );
}
