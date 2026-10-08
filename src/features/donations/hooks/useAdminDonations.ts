import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminSubscriptions, updateSubscription, type SubscriptionUpdatePayload } from '../api';

export function useAdminSubscriptions() {
  return useQuery({ queryKey: ['admin', 'subscriptions'], queryFn: getAdminSubscriptions });
}

export function useAdminSubscriptionMutations() {
  const queryClient = useQueryClient();
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SubscriptionUpdatePayload }) => updateSubscription(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'subscriptions'] }),
  });
  return { update };
}
