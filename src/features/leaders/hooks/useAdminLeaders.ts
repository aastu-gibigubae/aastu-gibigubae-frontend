import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLeader, deleteLeader, updateLeader, type LeaderAdminPayload } from '../api';

export function useAdminLeaderMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['leaders'] });

  const create = useMutation({ mutationFn: (payload: LeaderAdminPayload) => createLeader(payload), onSuccess: invalidate });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<LeaderAdminPayload> }) => updateLeader(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({ mutationFn: (id: string) => deleteLeader(id), onSuccess: invalidate });

  return { create, update, remove };
}
