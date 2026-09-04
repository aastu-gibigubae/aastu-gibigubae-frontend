import { useQuery } from '@tanstack/react-query';
import { getEventById, getEvents, getRelatedEvents } from '../api';
import type { EventFilters, EventItem } from '../types';

export function useEvents(filters: EventFilters, page: number) {
  return useQuery({
    queryKey: ['events', filters, page],
    queryFn: () => getEvents(filters, page),
    placeholderData: (previous) => previous, // keep old page visible while the next page loads
  });
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventById(id as string),
    enabled: Boolean(id),
  });
}

export function useRelatedEvents(eventId: string | undefined, category: EventItem['category'] | undefined) {
  return useQuery({
    queryKey: ['events', 'related', eventId, category],
    queryFn: () => getRelatedEvents(eventId as string, category as EventItem['category']),
    enabled: Boolean(eventId && category),
  });
}
