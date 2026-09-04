export interface MagazineIssue {
  id: string;
  title: string;
  coverLabel: string; // e.g. "Latest Issue: May 2026"
  releasedLabel: string; // e.g. "Released: June 24, 2019"
  description: string;
  isFeatured: boolean;
}
