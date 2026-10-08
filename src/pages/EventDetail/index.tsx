import { useParams } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, ImagePlaceholder } from '@components/ui';
import { images, photoFromPool } from '@/assets/images';
import { useEvent, useMoreEvents } from '@features/events/hooks/useEvents';
import { EventCard } from '@features/events/components/EventCard';
import { formatEventDate, formatEventTime } from '@features/events/format';

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { data: event, isLoading, isError } = useEvent(eventId);
  const { data: moreEvents } = useMoreEvents(event?.id);

  if (isLoading) {
    return <PageContainer className="py-16 text-center text-sm text-primary-dark/50">Loading event…</PageContainer>;
  }

  if (isError || !event) {
    return (
      <PageContainer className="py-16 text-center">
        <p className="text-sm text-red-500">We couldn't find that event.</p>
      </PageContainer>
    );
  }

  return (
    <div>
      <div className="relative">
        <ImagePlaceholder
          aspect="aspect-[16/7]"
          src={event.image_url ?? photoFromPool(Number(event.id) || 0)}
          alt={event.title}
          className="rounded-none"
        />
      </div>

      <PageContainer className="py-8">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: event.title }]} />

        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg border border-primary-dark/10 px-4 py-3 text-sm text-primary-dark/70">
          <span>{formatEventDate(event.event_date)}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{formatEventTime(event.event_date)}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{event.location}</span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="font-heading text-2xl text-primary-dark">About the Event</h1>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-primary-dark/70">{event.description}</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-surface p-5">
              <h2 className="font-heading text-sm text-primary-dark">Organizer</h2>
              <div className="mt-3 flex items-center gap-3">
                <ImagePlaceholder round className="h-10 w-10" src={images.orgSealLogo} alt="AASTU Gibigubae" />
                <div>
                  <p className="text-sm font-medium text-primary-dark">AASTU Gibi Gubae</p>
                  <p className="text-xs text-primary-dark/50">Student Organizer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {moreEvents && moreEvents.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading text-xl text-primary-dark">More Events</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {moreEvents.map((item) => (
                <EventCard key={item.id} event={item} />
              ))}
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
