import { useState } from 'react';
import { Button, Input, Select } from '@components/ui';
import { useAuth } from '@hooks/useAuth';
import { useScopeMutations, useScopes } from '@features/admin-scopes/hooks/useAdminScopes';
import { SCOPE_AREAS, type ScopeArea } from '@features/admin-scopes/types';

const SCOPE_OPTIONS = SCOPE_AREAS.map((area) => ({ label: area, value: area }));

export default function AdminScopes() {
  const { user } = useAuth();
  const [userId, setUserId] = useState('');
  const [lookupId, setLookupId] = useState('');
  const [newScope, setNewScope] = useState<ScopeArea>('EVENTS');

  const { data: scopes, isLoading, error } = useScopes(lookupId);
  const { grant, revoke } = useScopeMutations(lookupId);
  const isForbidden = (error as { response?: { status?: number } } | undefined)?.response?.status === 403;

  if (user && user.role !== 'admin') {
    return (
      <p className="text-sm text-red-500">
        Only the main admin account can manage sub-admin scopes — sub-admins can't grant or revoke scopes, even for
        themselves.
      </p>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary-dark">Admin Scopes</h1>
      <p className="mt-1 max-w-xl text-xs text-primary-dark/50">
        There's no endpoint to browse registered users yet — paste the target sub-admin's user ID (UUID) to manage
        their scopes.
      </p>

      <div className="mt-6 flex max-w-md items-end gap-3">
        <Input label="Sub-admin user ID (UUID)" value={userId} onChange={(e) => setUserId(e.target.value)} className="flex-1" />
        <Button variant="primary" onClick={() => setLookupId(userId)} disabled={!userId}>
          Look up
        </Button>
      </div>

      {lookupId && (
        <div className="mt-8 max-w-lg">
          {isLoading && <p className="text-sm text-primary-dark/50">Loading scopes…</p>}
          {isForbidden && <p className="text-sm text-red-500">Your account can't access scope management.</p>}

          {scopes && (
            <>
              <h2 className="font-heading text-sm text-primary-dark">Granted scopes</h2>
              <div className="mt-3 space-y-2">
                {scopes.length === 0 && <p className="text-sm text-primary-dark/50">No scopes granted yet.</p>}
                {scopes.map((scope) => (
                  <div key={scope.id} className="flex items-center justify-between rounded-lg border border-primary-dark/10 px-4 py-2">
                    <span className="text-sm text-primary-dark">{scope.scope_area}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => revoke.mutate(scope.scope_area)}
                      disabled={revoke.isPending}
                    >
                      Revoke
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-end gap-3">
                <Select
                  label="Grant a scope"
                  options={SCOPE_OPTIONS}
                  value={newScope}
                  onChange={(e) => setNewScope(e.target.value as ScopeArea)}
                  className="flex-1"
                />
                <Button variant="primary" onClick={() => grant.mutate(newScope)} disabled={grant.isPending}>
                  Grant
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
