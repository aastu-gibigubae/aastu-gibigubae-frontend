import { apiClient } from '@services/apiClient';
import type { AdminScope, ScopeArea } from './types';

/** Requires the STRICT admin role — a sub-admin can't call this even for their own userId. */
export async function getScopes(userId: string): Promise<AdminScope[]> {
  const { data } = await apiClient.get<AdminScope[]>(`/admin/sub-admins/${userId}/scopes`);
  return data;
}

export async function grantScope(userId: string, scopeArea: ScopeArea): Promise<AdminScope> {
  const { data } = await apiClient.post<AdminScope>(`/admin/sub-admins/${userId}/scopes`, { scope_area: scopeArea });
  return data;
}

export async function revokeScope(userId: string, scopeArea: ScopeArea): Promise<void> {
  await apiClient.delete(`/admin/sub-admins/${userId}/scopes/${scopeArea}`);
}
