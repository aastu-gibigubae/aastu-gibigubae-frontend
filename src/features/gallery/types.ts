/** Matches GET /api/gallery response exactly (AASTU Gibi Gubae API docs §8). */
export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  userId: string;
  created_at: string;
  updated_at: string;
}
