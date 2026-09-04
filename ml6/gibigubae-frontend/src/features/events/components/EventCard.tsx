import { Link } from 'react-router-dom';
import { Badge, Card, ImagePlaceholder, buttonStyles } from '@components/ui';
import type { EventItem } from '../types';

const CATEGORY_LABEL: Record<EventItem['category'], string> = {
  worship: 'Worship',
  seminar: 'Seminar',
  course: 'Course',
  conference: 'Conference',
};

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Card
      media={
        <>
          <ImagePlaceholder />
          <Badge tone="onImage" className="absolute left-2 top-2">
            {CATEGORY_LABEL[event.category]}
          </Badge>
        </>
      }
    >
      <p className="text-xs text-primary-dark/50">{event.dateLabel}</p>
      <h3 className="mt-1 font-heading text-base text-primary-dark">{event.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-primary-dark/60">{event.description}</p>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-primary-dark/50">
        <ClockIcon className="h-3.5 w-3.5" />
        {event.time}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-xs text-primary-dark/50">
        <PinIcon className="h-3.5 w-3.5" />
        {event.location}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-primary-dark/10 pt-3">
        <div>
          <p className="text-[11px] text-primary-dark/40">Organizer</p>
          <p className="text-xs text-primary-dark/70">{event.organizer}</p>
        </div>
        <Link to={`/events/${event.id}`} className={buttonStyles({ variant: 'outline', size: 'sm' })}>
          Details &gt;
        </Link>
      </div>
    </Card>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6v4l2.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 18s6-5.2 6-9.6A6 6 0 1 0 4 8.4C4 12.8 10 18 10 18Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8.2" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
