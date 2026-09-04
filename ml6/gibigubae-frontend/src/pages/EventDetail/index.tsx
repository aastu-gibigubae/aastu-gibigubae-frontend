import { useParams } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, Button, ImagePlaceholder } from '@components/ui';
import { useEvent, useRelatedEvents } from '@features/events/hooks/useEvents';
import { EventCard } from '@features/events/components/EventCard';

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { data: event, isLoading, isError } = useEvent(eventId);
  const { data: related } = useRelatedEvents(event?.id, event?.category);

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
        <ImagePlaceholder aspect="aspect-[16/7]" className="rounded-none" />
        <div className="absolute bottom-4 left-4 rounded-lg bg-primary-dark/90 px-4 py-2 text-center text-white sm:bottom-8 sm:left-8">
          <p className="text-xs uppercase tracking-wide">{event.dateLabel.split(' ')[0]}</p>
          <p className="font-heading text-2xl leading-none">{event.dateLabel.split(' ')[1]?.replace(',', '')}</p>
        </div>
      </div>

      <PageContainer className="py-8">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: event.title }]} />

        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg border border-primary-dark/10 px-4 py-3 text-sm text-primary-dark/70">
          <span>{event.dateLabel}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{event.time}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{event.location}</span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="font-heading text-2xl text-primary-dark">About the Event</h1>
            <p className="mt-3 text-sm leading-relaxed text-primary-dark/70">{event.description}</p>

            <ul className="mt-5 space-y-2">
              {event.highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-primary-dark/80">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent text-primary-dark">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-surface p-5">
              <h2 className="font-heading text-sm text-primary-dark">Organizer</h2>
              <div className="mt-3 flex items-center gap-3">
                <ImagePlaceholder round className="h-10 w-10" />
                <div>
                  <p className="text-sm font-medium text-primary-dark">{event.organizer}</p>
                  <p className="text-xs text-primary-dark/50">Student Organizer</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-5">
              <h2 className="font-heading text-sm text-primary-dark">Notifications</h2>
              <p className="mt-2 text-xs text-primary-dark/60">Event Reminders</p>
              <Button variant="outline" fullWidth className="mt-3">
                Enable Notification
              </Button>
            </div>
          </div>
        </div>

        {related && related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading text-xl text-primary-dark">Related Events</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((item) => (
                <EventCard key={item.id} event={item} />
              ))}
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
