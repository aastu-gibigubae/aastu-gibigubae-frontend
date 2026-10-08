import { useState } from 'react';
import { Button, Modal } from '@components/ui';
import { AdminTable, type AdminColumn } from '@components/admin/AdminTable';
import { GenericAdminForm, type AdminFieldConfig } from '@components/admin/GenericAdminForm';
import { useLeaders } from '@features/leaders/hooks/useLeaders';
import { useAdminLeaderMutations } from '@features/leaders/hooks/useAdminLeaders';
import type { Leader } from '@features/leaders/types';
import type { LeaderAdminPayload } from '@features/leaders/api';

const FIELDS: AdminFieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'role', label: 'Role', type: 'text', required: true },
  { name: 'biography', label: 'Biography', type: 'textarea', required: true },
  { name: 'userId', label: 'Linked user ID (UUID)', type: 'text', required: true, helperText: 'No user lookup exists yet — paste the UUID directly.' },
  { name: 'contact', label: 'Contact (optional)', type: 'text' },
  { name: 'image_url', label: 'Image URL (optional)', type: 'url' },
];

export default function AdminLeaders() {
  const { data, isLoading, error } = useLeaders();
  const { create, update, remove } = useAdminLeaderMutations();
  const [editing, setEditing] = useState<Leader | 'new' | null>(null);
  const isForbidden = (error as { response?: { status?: number } } | undefined)?.response?.status === 403;

  const columns: AdminColumn<Leader>[] = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'contact', label: 'Contact', render: (row) => row.contact ?? '—' },
  ];

  async function handleSubmit(values: Record<string, unknown>) {
    const payload: LeaderAdminPayload = {
      name: values.name as string,
      role: values.role as string,
      biography: values.biography as string,
      userId: values.userId as string,
      contact: (values.contact as string) || undefined,
      image_url: (values.image_url as string) || undefined,
    };

    if (editing === 'new') await create.mutateAsync(payload);
    else if (editing) await update.mutateAsync({ id: editing.id, payload });
    setEditing(null);
  }

  async function handleDelete(row: Leader) {
    if (confirm(`Delete "${row.name}"?`)) await remove.mutateAsync(row.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-primary-dark">Leaders</h1>
        <Button variant="primary" onClick={() => setEditing('new')}>
          New Leader
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

      {editing && (
        <Modal title={editing === 'new' ? 'New Leader' : 'Edit Leader'} onClose={() => setEditing(null)}>
          <GenericAdminForm
            fields={FIELDS}
            defaultValues={
              editing === 'new'
                ? { name: '', role: '', biography: '', userId: '', contact: '', image_url: '' }
                : {
                    name: editing.name,
                    role: editing.role,
                    biography: editing.biography,
                    userId: '',
                    contact: editing.contact ?? '',
                    image_url: editing.image_url ?? '',
                  }
            }
            onSubmit={handleSubmit}
            submitLabel={editing === 'new' ? 'Create Leader' : 'Save Changes'}
            error={create.isError || update.isError ? 'Something went wrong. Please try again.' : null}
          />
        </Modal>
      )}
    </div>
  );
}
