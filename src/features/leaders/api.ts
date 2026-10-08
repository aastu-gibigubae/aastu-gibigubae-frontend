import { apiClient } from '@services/apiClient';
import type { Leader } from './types';

export async function getLeaders(): Promise<Leader[]> {
  const { data } = await apiClient.get<Leader[]>('/leaders');
  return data;
}

// ---- Admin (Requires Auth + LEADERSHIP scope) ----
// No separate admin list endpoint — the public GET /leaders is reused.

export interface LeaderAdminPayload {
  name: string;
  role: string;
  biography: string;
  userId: string;
  contact?: string;
  image_url?: string;
}

export async function createLeader(payload: LeaderAdminPayload): Promise<Leader> {
  const { data } = await apiClient.post<Leader>('/leaders', payload);
  return data;
}

export async function updateLeader(id: string, payload: Partial<LeaderAdminPayload>): Promise<Leader> {
  const { data } = await apiClient.put<Leader>(`/leaders/${id}`, payload);
  return data;
}

export async function deleteLeader(id: string): Promise<void> {
  await apiClient.delete(`/leaders/${id}`);
}
