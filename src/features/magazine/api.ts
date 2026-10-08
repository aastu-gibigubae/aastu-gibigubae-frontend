import { apiClient } from '@services/apiClient';
import type { MagazineIssue } from './types';

/** The most recently published issue is treated as "featured" — the API has no isFeatured flag. */
export async function getFeaturedIssue(): Promise<MagazineIssue | null> {
  const issues = await getAllIssues();
  return issues[0] ?? null;
}

export async function getPastIssues(): Promise<MagazineIssue[]> {
  const issues = await getAllIssues();
  return issues.slice(1);
}

async function getAllIssues(): Promise<MagazineIssue[]> {
  const { data } = await apiClient.get<MagazineIssue[]>('/magazines');
  return [...data].sort((a, b) => b.published_at.localeCompare(a.published_at));
}

// ---- Admin (Requires Auth + MAGAZINE scope) ----

export interface MagazineAdminPayload {
  title: string;
  pdfUrl: string;
  userId: string;
  coverImage?: string;
  content?: string;
}

export async function getAdminMagazines(): Promise<MagazineIssue[]> {
  const { data } = await apiClient.get<MagazineIssue[]>('/magazines/admin/all');
  return data;
}

export async function createMagazine(payload: MagazineAdminPayload): Promise<MagazineIssue> {
  const { data } = await apiClient.post<MagazineIssue>('/magazines', payload);
  return data;
}

export async function updateMagazine(id: string, payload: Partial<MagazineAdminPayload>): Promise<MagazineIssue> {
  const { data } = await apiClient.patch<MagazineIssue>(`/magazines/${id}`, payload);
  return data;
}

export async function deleteMagazine(id: string): Promise<void> {
  await apiClient.delete(`/magazines/${id}`);
}
