import { useQuery } from '@tanstack/react-query';
import { getEventById, getEvents, getMoreEvents } from '../api';
import type { EventFilters } from '../types';

export function useEvents(filters: EventFilters, page: number) {
  return useQuery({
    queryKey: ['events', filters, page],
    queryFn: () => getEvents(filters, page),
    placeholderData: (previous) => previous,
  });
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventById(id as string),
    enabled: Boolean(id),
  });
}

export function useMoreEvents(excludeId: string | undefined) {
  return useQuery({
    queryKey: ['events', 'more', excludeId],
    queryFn: () => getMoreEvents(excludeId as string),
    enabled: Boolean(excludeId),
  });
}
