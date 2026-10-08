/** Matches GET /api/magazines response exactly (AASTU Gibi Gubae API docs §5). */
export interface MagazineIssue {
  id: string;
  title: string;
  cover_image: string | null;
  content: string | null;
  pdf_url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}
