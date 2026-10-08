/** Matches GET /api/kiflats response exactly (AASTU Gibi Gubae API docs §6-7). */
export interface SubKiflat {
  id: string;
  name: string;
  kiflat_id: string;
}

export interface Subgroup {
  id: string;
  name: string;
  description: string | null;
  image_urls: string[];
  sub_kiflat: SubKiflat[];
  created_at: string;
  updated_at: string;
}
