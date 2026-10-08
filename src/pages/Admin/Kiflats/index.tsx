import { useState } from 'react';
import { Button, Modal } from '@components/ui';
import { AdminTable, type AdminColumn } from '@components/admin/AdminTable';
import { GenericAdminForm, type AdminFieldConfig } from '@components/admin/GenericAdminForm';
import { useSubgroups } from '@features/subgroups/hooks/useSubgroups';
import { useAdminKiflatMutations, useAdminSubKiflatMutations } from '@features/subgroups/hooks/useAdminSubgroups';
import type { Subgroup, SubKiflat } from '@features/subgroups/types';
import type { KiflatAdminPayload, SubKiflatAdminPayload } from '@features/subgroups/api';

const KIFLAT_FIELDS: AdminFieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'description', label: 'Description (optional)', type: 'textarea' },
  { name: 'imageUrl', label: 'Image URL (optional)', type: 'url', helperText: 'Single image for now — the API accepts an array, this form only manages one.' },
];

const SUB_KIFLAT_FIELDS: AdminFieldConfig[] = [{ name: 'name', label: 'Name', type: 'text', required: true }];

export default function AdminKiflats() {
  const { data, isLoading, error } = useSubgroups();
  const kiflat = useAdminKiflatMutations();
  const subKiflat = useAdminSubKiflatMutations();

  const [editing, setEditing] = useState<Subgroup | 'new' | null>(null);
  const [managing, setManaging] = useState<Subgroup | null>(null);
  const [editingSub, setEditingSub] = useState<SubKiflat | 'new' | null>(null);

  const isForbidden = (error as { response?: { status?: number } } | undefined)?.response?.status === 403;

  const columns: AdminColumn<Subgroup>[] = [
    { key: 'name', label: 'Name' },
    { key: 'sub_kiflat', label: 'Sub-groups', render: (row) => String(row.sub_kiflat.length) },
  ];

  async function handleSubmit(values: Record<string, unknown>) {
    const payload: KiflatAdminPayload = {
      name: values.name as string,
      description: (values.description as string) || undefined,
      imageUrls: values.imageUrl ? [values.imageUrl as string] : undefined,
    };
    if (editing === 'new') await kiflat.create.mutateAsync(payload);
    else if (editing) await kiflat.update.mutateAsync({ id: editing.id, payload });
    setEditing(null);
  }

  async function handleDelete(row: Subgroup) {
    if (confirm(`Delete "${row.name}"? This will also remove its sub-groups.`)) await kiflat.remove.mutateAsync(row.id);
  }

  async function handleSubSubmit(values: Record<string, unknown>) {
    if (!managing) return;
    const payload: SubKiflatAdminPayload = { kiflatId: managing.id, name: values.name as string };
    if (editingSub === 'new') await subKiflat.create.mutateAsync(payload);
    else if (editingSub) await subKiflat.update.mutateAsync({ id: editingSub.id, payload });
    setEditingSub(null);
  }

  async function handleSubDelete(row: SubKiflat) {
    if (confirm(`Delete "${row.name}"?`)) await subKiflat.remove.mutateAsync(row.id);
  }

  // Keep the "managing" panel's data fresh after mutations invalidate the list.
  const managingLive = managing ? (data?.find((k) => k.id === managing.id) ?? managing) : null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-primary-dark">Kiflats</h1>
        <Button variant="primary" onClick={() => setEditing('new')}>
          New Kiflat
        </Button>
      </div>

      <div className="mt-6">
        <AdminTable
          columns={columns}
          rows={data ?? []}
          rowKey={(row) => row.id}
          onEdit={setEditing}
          onDelete={handleDelete}
          isLoading={isLoading}
          isForbidden={isForbidden}
        />
      </div>

      {data && data.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.map((row) => (
            <Button key={row.id} variant="ghost" size="sm" onClick={() => setManaging(row)}>
              Manage "{row.name}" sub-groups →
            </Button>
          ))}
        </div>
      )}

      {editing && (
        <Modal title={editing === 'new' ? 'New Kiflat' : 'Edit Kiflat'} onClose={() => setEditing(null)}>
          <GenericAdminForm
            fields={KIFLAT_FIELDS}
            defaultValues={
              editing === 'new'
                ? { name: '', description: '', imageUrl: '' }
                : { name: editing.name, description: editing.description ?? '', imageUrl: editing.image_urls[0] ?? '' }
            }
            onSubmit={handleSubmit}
            submitLabel={editing === 'new' ? 'Create Kiflat' : 'Save Changes'}
            error={kiflat.create.isError || kiflat.update.isError ? 'Something went wrong. Please try again.' : null}
          />
        </Modal>
      )}

      {managingLive && (
        <Modal title={`Sub-groups — ${managingLive.name}`} onClose={() => setManaging(null)}>
          <div className="space-y-3">
            {managingLive.sub_kiflat.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between rounded-lg border border-primary-dark/10 px-4 py-2">
                <span className="text-sm text-primary-dark">{sub.name}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingSub(sub)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleSubDelete(sub)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            {managingLive.sub_kiflat.length === 0 && (
              <p className="text-sm text-primary-dark/50">No sub-groups yet.</p>
            )}
            <Button variant="primary" size="sm" onClick={() => setEditingSub('new')}>
              Add Sub-group
            </Button>
          </div>
        </Modal>
      )}

      {editingSub && (
        <Modal title={editingSub === 'new' ? 'New Sub-group' : 'Edit Sub-group'} onClose={() => setEditingSub(null)}>
          <GenericAdminForm
            fields={SUB_KIFLAT_FIELDS}
            defaultValues={editingSub === 'new' ? { name: '' } : { name: editingSub.name }}
            onSubmit={handleSubSubmit}
            submitLabel={editingSub === 'new' ? 'Create Sub-group' : 'Save Changes'}
            error={subKiflat.create.isError || subKiflat.update.isError ? 'Something went wrong. Please try again.' : null}
          />
        </Modal>
      )}
    </div>
  );
}
