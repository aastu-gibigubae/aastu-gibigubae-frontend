import { apiClient } from '@services/apiClient';
import type { PagedResult } from '@/types/api';
import type { EventFilters, EventItem } from './types';

interface EventsApiResponse {
  events: EventItem[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

/**
 * GET /api/events supports pagination + search, but the docs don't specify
 * a sort query param — so `sort` is applied client-side to whichever page
 * comes back, not across the full dataset. Good enough for a small events
 * list; revisit if the backend adds a documented `sortBy` param.
 */
export async function getEvents(filters: EventFilters, page: number): Promise<PagedResult<EventItem>> {
  const { data } = await apiClient.get<EventsApiResponse>('/events', {
    params: { page, search: filters.search || undefined },
  });

  const items = [...data.events].sort((a, b) =>
    filters.sort === 'oldest'
      ? a.event_date.localeCompare(b.event_date)
      : b.event_date.localeCompare(a.event_date),
  );

  return { items, total: data.meta.total, totalPages: data.meta.totalPages };
}

export async function getEventById(id: string): Promise<EventItem | null> {
  try {
    const { data } = await apiClient.get<EventItem>(`/events/${id}`);
    return data;
  } catch {
    return null;
  }
}

/** No category field exists to relate by, so this just pulls a few other published events. */
export async function getMoreEvents(excludeId: string): Promise<EventItem[]> {
  const { data } = await apiClient.get<EventsApiResponse>('/events', { params: { page: 1 } });
  return data.events.filter((event) => event.id !== excludeId).slice(0, 3);
}

// ---- Admin (Requires Auth + EVENTS scope) ----

export interface EventAdminPayload {
  title: string;
  description: string;
  location: string;
  eventDate: string; // ISO
  userId: string;
  imageUrl?: string;
  isPublished?: boolean;
}

/** Assumed to share the {events,meta} shape with the public list — not shown separately in the docs. */
export async function getAdminEvents(page: number): Promise<PagedResult<EventItem>> {
  const { data } = await apiClient.get<EventsApiResponse>('/events/admin/all', { params: { page } });
  return { items: data.events, total: data.meta.total, totalPages: data.meta.totalPages };
}

export async function createEvent(payload: EventAdminPayload): Promise<EventItem> {
  const { data } = await apiClient.post<EventItem>('/events', payload);
  return data;
}

export async function updateEvent(id: string, payload: Partial<EventAdminPayload>): Promise<EventItem> {
  const { data } = await apiClient.patch<EventItem>(`/events/${id}`, payload);
  return data;
}

export async function deleteEvent(id: string): Promise<void> {
  await apiClient.delete(`/events/${id}`);
}
