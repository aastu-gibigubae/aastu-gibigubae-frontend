import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createEvent, deleteEvent, getAdminEvents, updateEvent, type EventAdminPayload } from '../api';

export function useAdminEvents(page: number) {
  return useQuery({ queryKey: ['admin', 'events', page], queryFn: () => getAdminEvents(page) });
}

export function useAdminEventMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'events'] });

  const create = useMutation({ mutationFn: (payload: EventAdminPayload) => createEvent(payload), onSuccess: invalidate });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<EventAdminPayload> }) => updateEvent(id, payload),
    onSuccess: invalidate,
  });
  const remove = useMutation({ mutationFn: (id: string) => deleteEvent(id), onSuccess: invalidate });

  return { create, update, remove };
}
