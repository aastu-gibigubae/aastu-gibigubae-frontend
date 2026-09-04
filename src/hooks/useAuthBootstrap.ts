import { useEffect } from 'react';
import { useAuthStore } from '@store/authStore';
import * as authApi from '@services/authApi';

/**
 * Call once from App.tsx. Attempts to restore a session via the auth
 * service's httpOnly refresh cookie on first load (e.g. after a page
 * refresh). Resolves to 'unauthenticated' silently if there's no valid
 * cookie — that's the normal case for a first-time visitor, not an error.
 */
export function useAuthBootstrap() {
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setStatus = useAuthStore((state) => state.setStatus);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    authApi
      .refresh()
      .then((session) => {
        if (!cancelled) setSession(session);
      })
      .catch(() => {
        if (!cancelled) clearSession();
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
  }, []);
}
