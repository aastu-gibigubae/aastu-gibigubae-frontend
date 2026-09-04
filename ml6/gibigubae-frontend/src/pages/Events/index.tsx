import { useState } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, ImagePlaceholder, Pagination, SearchInput, Select } from '@components/ui';
import { useEvents } from '@features/events/hooks/useEvents';
import { EventCard } from '@features/events/components/EventCard';
import { EventFiltersSidebar } from '@features/events/components/EventFiltersSidebar';
import { DEFAULT_EVENT_FILTERS, type EventFilters } from '@features/events/types';

const SORT_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming First' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
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
      <div className="relative overflow-hidden bg-ink text-white">
        <ImagePlaceholder aspect="aspect-video" tone="dark" className="absolute inset-0 h-full w-full rounded-none opacity-40" />
        <PageContainer className="relative py-14">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Events' }]} />
          <h1 className="mt-4 font-heading text-3xl">
            Our <span className="text-accent">Events</span>
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Discover upcoming programs, conferences, fellowship, and gatherings. Join us and grow in faith together.
          </p>
        </PageContainer>
      </div>

      <PageContainer className="py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder="Search events by title, speaker, keyword"
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

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <EventFiltersSidebar filters={filters} onChange={updateFilters} />

          <div>
            {isLoading && <p className="py-12 text-center text-sm text-primary-dark/50">Loading events…</p>}
            {isError && (
              <p className="py-12 text-center text-sm text-red-500">Couldn't load events right now. Please try again.</p>
            )}
            {data && data.items.length === 0 && (
              <p className="py-12 text-center text-sm text-primary-dark/50">No events match your filters.</p>
            )}

            {data && data.items.length > 0 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  {data.items.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} className="mt-10" />
              </>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
