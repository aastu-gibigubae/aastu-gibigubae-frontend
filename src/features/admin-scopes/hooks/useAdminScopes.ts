import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getScopes, grantScope, revokeScope } from '../api';
import type { ScopeArea } from '../types';

export function useScopes(userId: string) {
  return useQuery({ queryKey: ['admin-scopes', userId], queryFn: () => getScopes(userId), enabled: Boolean(userId) });
}

export function useScopeMutations(userId: string) {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin-scopes', userId] });

  const grant = useMutation({ mutationFn: (scopeArea: ScopeArea) => grantScope(userId, scopeArea), onSuccess: invalidate });
  const revoke = useMutation({ mutationFn: (scopeArea: ScopeArea) => revokeScope(userId, scopeArea), onSuccess: invalidate });

  return { grant, revoke };
}
