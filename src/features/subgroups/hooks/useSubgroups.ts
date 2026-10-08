import { useQuery } from '@tanstack/react-query';
import { getSubgroupById, getSubgroups } from '../api';

export function useSubgroups() {
  return useQuery({ queryKey: ['subgroups'], queryFn: getSubgroups });
}

export function useSubgroup(id: string | undefined) {
  return useQuery({
    queryKey: ['subgroup', id],
    queryFn: () => getSubgroupById(id as string),
    enabled: Boolean(id),
  });
}
