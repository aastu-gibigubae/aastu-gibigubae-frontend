/** Matches GET /api/leaders response exactly (AASTU Gibi Gubae API docs §2). userId is omitted for privacy. */
export interface Leader {
  id: string;
  name: string;
  role: string;
  biography: string;
  contact: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}
