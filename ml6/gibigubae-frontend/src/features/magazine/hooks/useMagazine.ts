import { useQuery } from '@tanstack/react-query';
import { getFeaturedIssue, getPastIssues } from '../api';

export function useFeaturedIssue() {
  return useQuery({ queryKey: ['magazine', 'featured'], queryFn: getFeaturedIssue });
}

export function usePastIssues() {
  return useQuery({ queryKey: ['magazine', 'past'], queryFn: getPastIssues });
}
