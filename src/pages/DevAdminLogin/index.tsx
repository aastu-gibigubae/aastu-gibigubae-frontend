import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui';
import { useAuthStore } from '@store/authStore';
import { getMockToken, buildMockUser, type MockRole } from '@services/devApi';

/**
 * Not part of the public site — mints a session via POST /dev/mock-token
 * so the admin panel can be tested without a real login backend. Remove
 * once real auth (or a seeded test account) is available.
 */
export default function DevAdminLogin() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [error, setError] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState<MockRole | null>(null);

  async function loginAs(role: MockRole) {
    setError(null);
    setLoadingRole(role);
    try {
      const accessToken = await getMockToken(role);
      setSession({ user: buildMockUser(role), accessToken });
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reach /dev/mock-token.');
    } finally {
      setLoadingRole(null);
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-4 p-8">
      <h1 className="font-heading text-xl text-primary-dark">Dev Admin Login</h1>
      <p className="text-sm text-primary-dark/60">
        Mints a session via <code>POST /api/dev/mock-token</code> — testing only.
      </p>

      <Button variant="primary" fullWidth disabled={loadingRole !== null} onClick={() => loginAs('ADMIN')}>
        {loadingRole === 'ADMIN' ? 'Logging in…' : 'Log in as Admin'}
      </Button>
      <Button variant="outline" fullWidth disabled={loadingRole !== null} onClick={() => loginAs('SUB_ADMIN')}>
        {loadingRole === 'SUB_ADMIN' ? 'Logging in…' : 'Log in as Sub-Admin'}
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
