import { useQuery } from '@tanstack/react-query';
import { getAnnouncements } from '../api';

export function useAnnouncements(page: number) {
  return useQuery({
    queryKey: ['announcements', page],
    queryFn: () => getAnnouncements(page),
    placeholderData: (previous) => previous,
  });
}
