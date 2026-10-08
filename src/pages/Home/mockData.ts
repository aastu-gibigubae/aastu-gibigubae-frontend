/**
 * Hardcoded placeholder content for Home sections that have no backend
 * module yet (Courses, Recorded Sessions) or no backend-driven stats
 * endpoint. Events, Subgroups, Magazine, and Announcements sections fetch
 * from the real API — see their respective feature hooks instead.
 */

export const academicResources = [
  { id: '1', title: 'Timherte Haymanote', author: 'By Dr. Henok Wondessen', weeks: '6 week', students: '201' },
  { id: '2', title: 'Timherte Haymanote', author: 'By Dr. Henok Wondessen', weeks: '6 week', students: '201' },
  { id: '3', title: 'Timherte Haymanote', author: 'By Dr. Henok Wondessen', weeks: '6 week', students: '201' },
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
