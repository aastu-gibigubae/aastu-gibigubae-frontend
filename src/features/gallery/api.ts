import { apiClient } from '@services/apiClient';
import type { GalleryImage } from './types';

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const { data } = await apiClient.get<GalleryImage[]>('/gallery');
  return data;
}

// ---- Admin (Requires Auth + GALLERY scope) ----
// No separate admin list endpoint — the public GET /gallery is reused.

export interface GalleryAdminPayload {
  title: string;
  image_url: string;
  description?: string;
}

export async function createGalleryImage(payload: GalleryAdminPayload): Promise<GalleryImage> {
  const { data } = await apiClient.post<GalleryImage>('/gallery', payload);
  return data;
}

export async function updateGalleryImage(id: string, payload: Partial<GalleryAdminPayload>): Promise<GalleryImage> {
  const { data } = await apiClient.patch<GalleryImage>(`/gallery/${id}`, payload);
  return data;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  await apiClient.delete(`/gallery/${id}`);
}
