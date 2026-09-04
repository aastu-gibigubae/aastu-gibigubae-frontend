/**
 * Hardcoded placeholder content for the Home page. Each feature (events,
 * courses, subgroups, magazine, announcements, media) gets wired to the
 * real backend individually in milestone 5 — this file just keeps the page
 * renderable and visually complete until then.
 */

export const upcomingEvents = [
  { id: '1', title: 'Worship day', date: 'May 20, 2026', time: '10:00 AM - 3:00PM', location: 'AASTU, Location' },
  { id: '2', title: 'Worship day', date: 'May 20, 2026', time: '10:00 AM - 3:00PM', location: 'AASTU, Location' },
  { id: '3', title: 'Worship day', date: 'May 20, 2026', time: '10:00 AM - 3:00PM', location: 'AASTU, Location' },
];

export const academicResources = [
  { id: '1', title: 'Timherte Haymanote', author: 'By Dr. Henok Wondessen', weeks: '6 week', students: '201' },
  { id: '2', title: 'Timherte Haymanote', author: 'By Dr. Henok Wondessen', weeks: '6 week', students: '201' },
  { id: '3', title: 'Timherte Haymanote', author: 'By Dr. Henok Wondessen', weeks: '6 week', students: '201' },
];

export const featuredSubgroup = {
  name: 'Subgroup Name',
  description: 'This subgroup is about this, this and that, this subgroup is about this, this and that.',
  subSubgroups: ['Sub-sub group', 'Sub-sub group', 'Sub-sub group'],
};

export const latestMagazine = {
  issueLabel: 'Latest Issue: May 2026',
  title: 'THE TITLE OF THE MAGAZINE',
};

export const latestAnnouncements = [
  { id: '1', date: 'Oct 27', title: 'Gibi Gubae General Assembly: Schedule Update' },
  { id: '2', date: 'Oct 27', title: 'Gibi Gubae General Assembly: Schedule Update' },
  { id: '3', date: 'Oct 27', title: 'Gibi Gubae General Assembly: Schedule Update' },
  { id: '4', date: 'Oct 27', title: 'Gibi Gubae General Assembly: Schedule Update' },
];

export const recordedSessions = [
  { id: '1', title: 'About the church', speaker: 'Speaker: Dn. Abebe t.' },
  { id: '2', title: 'About the church', speaker: 'Speaker: Dn. Abebe t.' },
  { id: '3', title: 'About the church', speaker: 'Speaker: Dn. Abebe t.' },
];

export const trustStats = [
  { id: '1', value: '8000+', label: 'Members' },
  { id: '2', value: '500+', label: 'Events held' },
  { id: '3', value: '10+', label: 'Subgroups' },
];
