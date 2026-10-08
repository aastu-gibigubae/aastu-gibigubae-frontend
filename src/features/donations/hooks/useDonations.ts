import { useMutation, useQuery } from '@tanstack/react-query';
import { getDonationPackages, submitSubscription } from '../api';

export function useDonationPackages() {
  return useQuery({ queryKey: ['donation-packages'], queryFn: getDonationPackages });
}

export function useSubmitSubscription() {
  return useMutation({ mutationFn: submitSubscription });
}
