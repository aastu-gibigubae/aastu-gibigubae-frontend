/** Matches GET .../scopes response exactly (AASTU Gibi Gubae API docs §9). */
export const SCOPE_AREAS = [
  'EVENTS',
  'LEADERSHIP',
  'MEDIA',
  'MAGAZINE',
  'ANNOUNCEMENTS',
  'ALEHU_BEWERE',
  'KIFLAT',
  'GALLERY',
] as const;

export type ScopeArea = (typeof SCOPE_AREAS)[number];

export interface AdminScope {
  id: string;
  admin_user_id: string;
  scope_area: ScopeArea;
  assigned_by: string;
  assigned_at: string;
}
