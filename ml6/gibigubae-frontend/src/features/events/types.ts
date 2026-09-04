export type EventCategory = 'worship' | 'seminar' | 'course' | 'conference';
export type EventStatus = 'upcoming' | 'past' | 'featured';

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  /** Display-formatted date string, e.g. "Tire 24, 2019" — matches the design's own date format. */
  dateLabel: string;
  /** ISO date, used for sorting/filtering. */
  isoDate: string;
  time: string;
  location: string;
  organizer: string;
  status: EventStatus;
  highlights: string[];
}

export interface EventFilters {
  search: string;
  categories: EventCategory[];
  statuses: EventStatus[];
  date: string; // ISO date or ''
  location: string; // '' = all locations
  sort: 'upcoming' | 'newest' | 'oldest';
}

export const DEFAULT_EVENT_FILTERS: EventFilters = {
  search: '',
  categories: [],
  statuses: [],
  date: '',
  location: '',
  sort: 'upcoming',
};
