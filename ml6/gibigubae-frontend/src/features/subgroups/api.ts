import type { Subgroup } from './types';
import { MOCK_SUBGROUPS } from './mockData';
// import { apiClient } from '@services/apiClient'; // uncomment once GET /kiflat exists

/** TEMPORARY — see features/events/api.ts for the same note. */
export async function getSubgroups(): Promise<Subgroup[]> {
  return MOCK_SUBGROUPS;
}

export async function getSubgroupBySlug(slug: string): Promise<Subgroup | null> {
  return MOCK_SUBGROUPS.find((s) => s.slug === slug) ?? null;
}
