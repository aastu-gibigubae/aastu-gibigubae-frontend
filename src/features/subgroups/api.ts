import { apiClient } from '@services/apiClient';
import type { Subgroup } from './types';

export async function getSubgroups(): Promise<Subgroup[]> {
  const { data } = await apiClient.get<Subgroup[]>('/kiflats');
  return data;
}

export async function getSubgroupById(id: string): Promise<Subgroup | null> {
  try {
    const { data } = await apiClient.get<Subgroup>(`/kiflats/${id}`);
    return data;
  } catch {
    return null;
  }
}

// ---- Admin (Requires Auth + KIFLAT scope) ----
// No separate admin list endpoint — the public GET /kiflats is reused.

export interface KiflatAdminPayload {
  name: string;
  description?: string;
  imageUrls?: string[];
}

export async function createKiflat(payload: KiflatAdminPayload): Promise<Subgroup> {
  const { data } = await apiClient.post<Subgroup>('/kiflats', payload);
  return data;
}

export async function updateKiflat(id: string, payload: Partial<KiflatAdminPayload>): Promise<Subgroup> {
  const { data } = await apiClient.patch<Subgroup>(`/kiflats/${id}`, payload);
  return data;
}

export async function deleteKiflat(id: string): Promise<void> {
  await apiClient.delete(`/kiflats/${id}`);
}

export interface SubKiflatAdminPayload {
  kiflatId: string;
  name: string;
  description?: string;
  imageUrls?: string[];
}

export async function createSubKiflat(payload: SubKiflatAdminPayload): Promise<void> {
  await apiClient.post('/sub-kiflats', payload);
}

export async function updateSubKiflat(id: string, payload: Partial<SubKiflatAdminPayload>): Promise<void> {
  await apiClient.patch(`/sub-kiflats/${id}`, payload);
}

export async function deleteSubKiflat(id: string): Promise<void> {
  await apiClient.delete(`/sub-kiflats/${id}`);
}
