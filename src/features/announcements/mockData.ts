import type { Announcement } from './types';

/** TEMPORARY placeholder dataset — see api.ts for how this gets replaced. */
export const MOCK_ANNOUNCEMENTS: Announcement[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  month: 'Oct',
  day: '27',
  title: 'Gibi Gubae General Assembly: Schedule Update',
  description:
    'This post is to announce that there is annual meeting of the general assemblies to discuss on the general management.',
}));
