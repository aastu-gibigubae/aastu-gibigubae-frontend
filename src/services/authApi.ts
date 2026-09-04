import axios from 'axios';
import type { AuthSession, LoginPayload, RegisterPayload } from '@/types/auth';

/**
 * Separate axios instance from apiClient — this talks to the standalone
 * Authentication Service (VITE_AUTH_BASE_URL), not the main backend.
 * withCredentials so the service's httpOnly refresh cookie is sent/received.
 */
const authClient = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  withCredentials: true,
});

export async function login(payload: LoginPayload): Promise<AuthSession> {
  const { data } = await authClient.post<AuthSession>('/login', payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<AuthSession> {
  const { data } = await authClient.post<AuthSession>('/register', payload);
  return data;
}

/** Exchanges the httpOnly refresh cookie for a new access token + user. */
export async function refresh(): Promise<AuthSession> {
  const { data } = await authClient.post<AuthSession>('/refresh');
  return data;
}

export async function logout(): Promise<void> {
  await authClient.post('/logout');
}
