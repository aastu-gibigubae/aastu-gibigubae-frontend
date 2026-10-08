import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMagazine, deleteMagazine, getAdminMagazines, updateMagazine, type MagazineAdminPayload } from '../api';

export function useAdminMagazines() {
  return useQuery({ queryKey: ['admin', 'magazines'], queryFn: getAdminMagazines });
}

export function useAdminMagazineMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'magazines'] });
    queryClient.invalidateQueries({ queryKey: ['magazine'] });
  };

  const create = useMutation({ mutationFn: (payload: MagazineAdminPayload) => createMagazine(payload), onSuccess: invalidate });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<MagazineAdminPayload> }) => updateMagazine(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({ mutationFn: (id: string) => deleteMagazine(id), onSuccess: invalidate });

  return { create, update, remove };
}
