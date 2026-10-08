import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
  type GalleryAdminPayload,
} from '../api';

export function useAdminGalleryMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['gallery'] });

  const create = useMutation({
    mutationFn: (payload: GalleryAdminPayload) => createGalleryImage(payload),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<GalleryAdminPayload> }) =>
      updateGalleryImage(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({ mutationFn: (id: string) => deleteGalleryImage(id), onSuccess: invalidate });

  return { create, update, remove };
}
