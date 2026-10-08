/**
 * Matches GET /api/events response exactly (AASTU Gibi Gubae API docs §1).
 * No category/status/organizer/highlights fields exist on the real entity —
 * those were mock-only richness from before the backend existed.
 */
export interface EventItem {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  location: string;
  event_date: string; // ISO datetime
  is_published: boolean;
  userId: string;
  created_at: string;
  updated_at: string;
}

export interface EventFilters {
  search: string;
  sort: 'newest' | 'oldest';
}

export const DEFAULT_EVENT_FILTERS: EventFilters = {
  search: '',
  sort: 'newest',
};
