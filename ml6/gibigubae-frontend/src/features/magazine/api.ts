import type { MagazineIssue } from './types';
import { MOCK_ISSUES } from './mockData';
// import { apiClient } from '@services/apiClient'; // uncomment once GET /magazines exists

/** TEMPORARY — see features/events/api.ts for the same note. */
export async function getFeaturedIssue(): Promise<MagazineIssue | null> {
  return MOCK_ISSUES.find((issue) => issue.isFeatured) ?? null;
}

export async function getPastIssues(): Promise<MagazineIssue[]> {
  return MOCK_ISSUES.filter((issue) => !issue.isFeatured);
}
