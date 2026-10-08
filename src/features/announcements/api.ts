import { apiClient } from '@services/apiClient';
import type { PagedResult } from '@/types/api';
import type { Announcement } from './types';

const PAGE_SIZE = 4;

/**
 * GET /api/announcements returns a plain array with no documented
 * pagination params, so pagination happens client-side over the full list.
 */
export async function getAnnouncements(page: number): Promise<PagedResult<Announcement>> {
  const { data } = await apiClient.get<Announcement[]>('/announcements');
  const sorted = [...data].sort((a, b) => b.created_at.localeCompare(a.created_at));

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  return { items: sorted.slice(start, start + PAGE_SIZE), total, totalPages };
}

// ---- Admin (Requires Auth + ANNOUNCEMENTS scope) ----
// No "list all" admin endpoint exists (only GET /admin/:id for a single
// bypass-filters lookup) — the admin table reuses the public active list,
// so expired/inactive announcements won't show up there.

export interface AnnouncementAdminPayload {
  title: string;
  content: string;
  expires_at: string; // ISO
  userId: string;
  is_active?: boolean;
}

export async function createAnnouncement(payload: AnnouncementAdminPayload): Promise<Announcement> {
  const { data } = await apiClient.post<Announcement>('/announcements', payload);
  return data;
}

export async function updateAnnouncement(id: string, payload: Partial<AnnouncementAdminPayload>): Promise<Announcement> {
  const { data } = await apiClient.put<Announcement>(`/announcements/${id}`, payload);
  return data;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  await apiClient.delete(`/announcements/${id}`);
}
