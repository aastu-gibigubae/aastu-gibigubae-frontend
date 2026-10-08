import { apiClient } from './apiClient';
import type { Role, User } from '@/types/auth';

export type MockRole = 'ADMIN' | 'SUB_ADMIN' | 'REGISTERED';

const ROLE_MAP: Record<MockRole, Role> = {
  ADMIN: 'admin',
  SUB_ADMIN: 'sub_admin',
  REGISTERED: 'registered',
};

/**
 * Response shape isn't documented — handles either `{ token }` or
 * `{ accessToken }` defensively.
 */
export async function getMockToken(role: MockRole): Promise<string> {
  const { data } = await apiClient.post<{ token?: string; accessToken?: string }>('/dev/mock-token', { role });
  const token = data.accessToken ?? data.token;
  if (!token) throw new Error('Mock token endpoint did not return a token.');
  return token;
}

/**
 * The mock-token endpoint only returns a JWT, not a user profile — this
 * builds a placeholder User so the rest of the app (which expects a full
 * session) has something to display.
 */
export function buildMockUser(role: MockRole): User {
  return {
    id: 'mock-user',
    firstName: 'Mock',
    lastName: role === 'ADMIN' ? 'Admin' : role === 'SUB_ADMIN' ? 'Sub-Admin' : 'User',
    phone: '',
    role: ROLE_MAP[role],
  };
}
