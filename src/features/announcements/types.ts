/** Matches GET /api/announcements response exactly (AASTU Gibi Gubae API docs §3). */
export interface Announcement {
  id: string;
  title: string;
  content: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
