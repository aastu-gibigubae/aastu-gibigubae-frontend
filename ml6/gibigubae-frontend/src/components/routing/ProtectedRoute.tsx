import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import type { Role } from '@/types/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  /** Omit to just require any authenticated user; pass to also restrict by role. */
  roles?: Role[];
}

/**
 * Not yet used by any route — no protected pages exist until the admin
 * dashboard / member-only content lands in a later milestone. Wraps a page
 * element: `<Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminHome /></ProtectedRoute>} />`.
 */
export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return null; // avoid a login-flash while the silent refresh is in flight
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
