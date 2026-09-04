import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@store/authStore';
import * as authApi from '@services/authApi';
import type { LoginPayload, RegisterPayload } from '@/types/auth';

/**
 * Thin wrapper so pages/components never call authApi or the store
 * directly — one place to change if the session-handling strategy changes.
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: setSession,
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: setSession,
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: clearSession, // clear local session even if the server call fails
  });

  return {
    user,
    isAuthenticated: status === 'authenticated',
    isBootstrapping: status === 'idle' || status === 'loading',
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutateAsync,
  };
}
