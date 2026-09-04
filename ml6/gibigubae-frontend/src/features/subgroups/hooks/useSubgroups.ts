import { useQuery } from '@tanstack/react-query';
import { getSubgroupBySlug, getSubgroups } from '../api';

export function useSubgroups() {
  return useQuery({ queryKey: ['subgroups'], queryFn: getSubgroups });
}

export function useSubgroup(slug: string | undefined) {
  return useQuery({
    queryKey: ['subgroup', slug],
    queryFn: () => getSubgroupBySlug(slug as string),
    enabled: Boolean(slug),
  });
}
