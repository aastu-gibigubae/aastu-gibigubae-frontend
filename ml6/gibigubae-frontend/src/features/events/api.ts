import type { EventFilters, EventItem } from './types';
import { MOCK_EVENTS } from './mockEvents';
import type { PagedResult } from '@/types/api';
// import { apiClient } from '@services/apiClient'; // uncomment once GET /events exists

const PAGE_SIZE = 4;

/**
 * TEMPORARY implementation — filters/sorts/paginates the local mock array.
 * Once the backend's GET /events endpoint exists, replace the body with:
 *
 *   const { data } = await apiClient.get<PagedResult<EventItem>>('/events', {
 *     params: { ...filters, page, pageSize: PAGE_SIZE },
 *   });
 *   return data;
 *
 * The signature and return shape already match what that call would give
 * back, so nothing calling getEvents() needs to change.
 */
export async function getEvents(filters: EventFilters, page: number): Promise<PagedResult<EventItem>> {
  let items = [...MOCK_EVENTS];

  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    items = items.filter(
      (event) => event.title.toLowerCase().includes(query) || event.organizer.toLowerCase().includes(query),
    );
  }
  if (filters.categories.length > 0) {
    items = items.filter((event) => filters.categories.includes(event.category));
  }
  if (filters.statuses.length > 0) {
    items = items.filter((event) => filters.statuses.includes(event.status));
  }
  if (filters.date) {
    items = items.filter((event) => event.isoDate === filters.date);
  }
  if (filters.location) {
    items = items.filter((event) => event.location === filters.location);
  }

  items.sort((a, b) => {
    if (filters.sort === 'oldest') return a.isoDate.localeCompare(b.isoDate);
    if (filters.sort === 'newest') return b.isoDate.localeCompare(a.isoDate);
    // 'upcoming' — soonest first among today-or-later, then the rest most-recent-first
    return b.isoDate.localeCompare(a.isoDate);
  });

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paged = items.slice(start, start + PAGE_SIZE);

  return { items: paged, total, totalPages };
}

/** Same temporary-vs-real note as getEvents() above. */
export async function getEventById(id: string): Promise<EventItem | null> {
  return MOCK_EVENTS.find((event) => event.id === id) ?? null;
}

/** Used by EventDetail's "Related Events" — same category, excluding the current event. */
export async function getRelatedEvents(eventId: string, category: EventItem['category']): Promise<EventItem[]> {
  return MOCK_EVENTS.filter((event) => event.id !== eventId && event.category === category).slice(0, 3);
}
