import { useQuery } from '@tanstack/react-query';
import { getLeaders } from '../api';

export function useLeaders() {
  return useQuery({ queryKey: ['leaders'], queryFn: getLeaders });
}
