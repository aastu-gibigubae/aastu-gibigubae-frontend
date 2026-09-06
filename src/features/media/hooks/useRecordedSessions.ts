import { useQuery } from '@tanstack/react-query';
import { getRecordedSessions } from '../api';

export function useRecordedSessions(page: number) {
  return useQuery({
    queryKey: ['media', 'sessions', page],
    queryFn: () => getRecordedSessions(page),
    placeholderData: (previous) => previous,
  });
}
