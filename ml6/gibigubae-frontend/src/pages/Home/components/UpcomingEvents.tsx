import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { Card, ImagePlaceholder, buttonStyles } from '@components/ui';
import { upcomingEvents } from '../mockData';

export function UpcomingEvents() {
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

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {upcomingEvents.map((event) => (
            <Card key={event.id} media={<ImagePlaceholder />}>
              <p className="text-xs text-primary-dark/50">
                {event.date} &middot; {event.time}
              </p>
              <h3 className="mt-1 font-heading text-base text-primary-dark">{event.title}</h3>
              <p className="mt-1 text-xs text-primary-dark/50">{event.location}</p>
              <Link
                to={`/events/${event.id}`}
                className={buttonStyles({ variant: 'outline', size: 'sm', fullWidth: true, className: 'mt-4' })}
              >
                View Details
              </Link>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
