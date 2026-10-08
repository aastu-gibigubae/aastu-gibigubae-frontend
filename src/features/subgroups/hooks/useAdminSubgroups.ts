import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createKiflat,
  createSubKiflat,
  deleteKiflat,
  deleteSubKiflat,
  updateKiflat,
  updateSubKiflat,
  type KiflatAdminPayload,
  type SubKiflatAdminPayload,
} from '../api';

export function useAdminKiflatMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['subgroups'] });

  const create = useMutation({ mutationFn: (payload: KiflatAdminPayload) => createKiflat(payload), onSuccess: invalidate });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<KiflatAdminPayload> }) => updateKiflat(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({ mutationFn: (id: string) => deleteKiflat(id), onSuccess: invalidate });

  return { create, update, remove };
}

export function useAdminSubKiflatMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['subgroups'] });

  const create = useMutation({
    mutationFn: (payload: SubKiflatAdminPayload) => createSubKiflat(payload),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<SubKiflatAdminPayload> }) => updateSubKiflat(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({ mutationFn: (id: string) => deleteSubKiflat(id), onSuccess: invalidate });

  return { create, update, remove };
}
