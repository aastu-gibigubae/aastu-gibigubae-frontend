import type { PagedResult } from '@/types/api';
import type { Announcement } from './types';
import { MOCK_ANNOUNCEMENTS } from './mockData';
// import { apiClient } from '@services/apiClient'; // uncomment once GET /announcements exists

const PAGE_SIZE = 4;

/** TEMPORARY — see features/events/api.ts for the same note. */
export async function getAnnouncements(page: number): Promise<PagedResult<Announcement>> {
  const total = MOCK_ANNOUNCEMENTS.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  return { items: MOCK_ANNOUNCEMENTS.slice(start, start + PAGE_SIZE), total, totalPages };
}
