import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnnouncement, deleteAnnouncement, updateAnnouncement, type AnnouncementAdminPayload } from '../api';

export function useAdminAnnouncementMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['announcements'] });

  const create = useMutation({
    mutationFn: (payload: AnnouncementAdminPayload) => createAnnouncement(payload),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<AnnouncementAdminPayload> }) =>
      updateAnnouncement(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({ mutationFn: (id: string) => deleteAnnouncement(id), onSuccess: invalidate });

  return { create, update, remove };
}
