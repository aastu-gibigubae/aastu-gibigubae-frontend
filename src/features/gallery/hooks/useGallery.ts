import { useQuery } from '@tanstack/react-query';
import { getGalleryImages } from '../api';

export function useGallery() {
  return useQuery({ queryKey: ['gallery'], queryFn: getGalleryImages });
}
