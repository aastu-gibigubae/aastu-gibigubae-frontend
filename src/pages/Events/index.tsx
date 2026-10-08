import { useState } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { PageHero } from '@components/layout/PageHero';
import { Breadcrumb, Pagination, SearchInput, Select } from '@components/ui';
import { images } from '@/assets/images';
import { useEvents } from '@features/events/hooks/useEvents';
import { EventCard } from '@features/events/components/EventCard';
import { DEFAULT_EVENT_FILTERS, type EventFilters } from '@features/events/types';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

export default function Events() {
  const [filters, setFilters] = useState<EventFilters>(DEFAULT_EVENT_FILTERS);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useEvents(filters, page);

  function updateFilters(next: EventFilters) {
    setFilters(next);
    setPage(1);
  }

  return (
    <div>
      <PageHero image={images.churchExteriorFestive} imageAlt="Festively decorated church exterior">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Events' }]} />
        <h1 className="mt-4 font-heading text-3xl">
          Our <span className="text-accent">Events</span>
        </h1>
        <p className="mt-2 max-w-md text-sm text-white/70">
          Discover upcoming programs, conferences, fellowship, and gatherings. Join us and grow in faith together.
        </p>
      </PageHero>

      <PageContainer className="py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder="Search events by title or location"
            className="max-w-md flex-1"
            value={filters.search}
            onChange={(e) => updateFilters({ ...filters, search: e.target.value })}
          />
          <div className="flex items-center gap-2 text-sm text-primary-dark/70">
            <span className="whitespace-nowrap">Sort by:</span>
            <Select
              options={SORT_OPTIONS}
              value={filters.sort}
              onChange={(e) => updateFilters({ ...filters, sort: e.target.value as EventFilters['sort'] })}
            />
          </div>
        </div>

        <div className="mt-8">
          {isLoading && <p className="py-12 text-center text-sm text-primary-dark/50">Loading events…</p>}
          {isError && (
            <p className="py-12 text-center text-sm text-red-500">Couldn't load events right now. Please try again.</p>
          )}
          {data && data.items.length === 0 && (
            <p className="py-12 text-center text-sm text-primary-dark/50">No events match your search.</p>
          )}

          {data && data.items.length > 0 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.items.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} className="mt-10" />
            </>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
