import type { PagedResult } from '@/types/api';
import type { RecordedSession } from './types';
import { MOCK_SESSIONS } from './mockData';
// import { apiClient } from '@services/apiClient'; // uncomment once GET /media/sessions exists

const PAGE_SIZE = 6;

/** TEMPORARY — see features/events/api.ts for the same note. */
export async function getRecordedSessions(page: number): Promise<PagedResult<RecordedSession>> {
  const total = MOCK_SESSIONS.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  return { items: MOCK_SESSIONS.slice(start, start + PAGE_SIZE), total, totalPages };
}
