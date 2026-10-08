import { apiClient } from '@services/apiClient';
import type { DonationPackage, Subscription, SubscriptionPayload } from './types';

export async function getDonationPackages(): Promise<DonationPackage[]> {
  const { data } = await apiClient.get<DonationPackage[]>('/alehu-bewere/packages');
  return data.filter((pkg) => pkg.is_active);
}

export async function submitSubscription(payload: SubscriptionPayload): Promise<Subscription> {
  const { data } = await apiClient.post<Subscription>('/alehu-bewere/subscriptions', payload);
  return data;
}

// ---- Admin (Requires Auth + ALEHU_BEWERE scope) ----
// No create/delete for admins — subscriptions are only ever created by
// public visitors; admins can only review and update status/notes.

export async function getAdminSubscriptions(): Promise<Subscription[]> {
  const { data } = await apiClient.get<Subscription[]>('/alehu-bewere/subscriptions');
  return data;
}

export interface SubscriptionUpdatePayload {
  status: Subscription['status'];
  admin_note?: string;
}

export async function updateSubscription(id: string, payload: SubscriptionUpdatePayload): Promise<Subscription> {
  const { data } = await apiClient.patch<Subscription>(`/alehu-bewere/subscriptions/${id}`, payload);
  return data;
}
