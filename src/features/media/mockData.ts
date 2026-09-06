import type { RecordedSession } from './types';

/** TEMPORARY placeholder dataset — see api.ts for how this gets replaced. */
export const MOCK_SESSIONS: RecordedSession[] = Array.from({ length: 14 }, (_, i) => ({
  id: String(i + 1),
  title: 'Discussion on theosis',
  speaker: 'by. Dn Abebe Haile',
  dateLabel: 'Jan 2, 2026',
  isoDate: '2026-01-02',
}));
