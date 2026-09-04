import { create } from 'zustand';
import type { AuthSession, User } from '@/types/auth';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  /** Called after a successful login/register/refresh response. */
  setSession: (session: AuthSession) => void;
  /** Called on logout or when a refresh attempt fails. */
  clearSession: () => void;
  setStatus: (status: AuthStatus) => void;
}

/**
 * Deliberately NOT using zustand's `persist` middleware here — the access
 * token stays in memory only, so it disappears on tab close/reload by
 * design. Session continuity across reloads comes from calling
 * authApi.refresh() on app boot (see hooks/useAuth.ts), which relies on the
 * auth service's httpOnly refresh cookie rather than anything readable by
 * client-side JS. This avoids the XSS exposure of a token sitting in
 * localStorage.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  status: 'idle',
  setSession: ({ user, accessToken }) => set({ user, accessToken, status: 'authenticated' }),
  clearSession: () => set({ user: null, accessToken: null, status: 'unauthenticated' }),
  setStatus: (status) => set({ status }),
}));
