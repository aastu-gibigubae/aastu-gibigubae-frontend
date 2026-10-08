import { useState } from 'react';
import { Button, Modal, Pagination } from '@components/ui';
import { AdminTable, type AdminColumn } from '@components/admin/AdminTable';
import { GenericAdminForm, type AdminFieldConfig } from '@components/admin/GenericAdminForm';
import { useAnnouncements } from '@features/announcements/hooks/useAnnouncements';
import { useAdminAnnouncementMutations } from '@features/announcements/hooks/useAdminAnnouncements';
import type { Announcement } from '@features/announcements/types';
import type { AnnouncementAdminPayload } from '@features/announcements/api';

const FIELDS: AdminFieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'content', label: 'Content', type: 'textarea', required: true },
  { name: 'expiresAt', label: 'Expires at', type: 'datetime-local', required: true },
  { name: 'userId', label: 'Author user ID (UUID)', type: 'text', required: true, helperText: 'No user lookup exists yet — paste the UUID directly.' },
  { name: 'isActive', label: 'Active', type: 'checkbox' },
];

function toIso(value: string): string {
  return value ? new Date(value).toISOString() : '';
}

export default function AdminAnnouncements() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useAnnouncements(page);
  const { create, update, remove } = useAdminAnnouncementMutations();
  const [editing, setEditing] = useState<Announcement | 'new' | null>(null);
  const isForbidden = (error as { response?: { status?: number } } | undefined)?.response?.status === 403;

  const columns: AdminColumn<Announcement>[] = [
    { key: 'title', label: 'Title' },
    { key: 'expires_at', label: 'Expires', render: (row) => new Date(row.expires_at).toLocaleDateString() },
    { key: 'is_active', label: 'Status', render: (row) => (row.is_active ? 'Active' : 'Inactive') },
  ];

  async function handleSubmit(values: Record<string, unknown>) {
    const payload: AnnouncementAdminPayload = {
      title: values.title as string,
      content: values.content as string,
      expires_at: toIso(values.expiresAt as string),
      userId: values.userId as string,
      is_active: Boolean(values.isActive),
    };
    if (editing === 'new') await create.mutateAsync(payload);
    else if (editing) await update.mutateAsync({ id: editing.id, payload });
    setEditing(null);
  }

  async function handleDelete(row: Announcement) {
    if (confirm(`Delete "${row.title}"?`)) await remove.mutateAsync(row.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-primary-dark">Announcements</h1>
        <Button variant="primary" onClick={() => setEditing('new')}>
          New Announcement
        </Button>
      </div>
      <p className="mt-1 text-xs text-primary-dark/50">
        Only active, non-expired announcements are listed here — there's no admin "list all" endpoint yet.
      </p>

      <div className="mt-6">
        <AdminTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(row) => row.id}
          onEdit={setEditing}
          onDelete={handleDelete}
          isLoading={isLoading}
          isForbidden={isForbidden}
        />
        {data && <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} className="mt-6" />}
      </div>

      {editing && (
        <Modal title={editing === 'new' ? 'New Announcement' : 'Edit Announcement'} onClose={() => setEditing(null)}>
          <GenericAdminForm
            fields={FIELDS}
            defaultValues={
              editing === 'new'
                ? { title: '', content: '', expiresAt: '', userId: '', isActive: true }
                : { title: editing.title, content: editing.content, expiresAt: '', userId: '', isActive: editing.is_active }
            }
            onSubmit={handleSubmit}
            submitLabel={editing === 'new' ? 'Create Announcement' : 'Save Changes'}
            error={create.isError || update.isError ? 'Something went wrong. Please try again.' : null}
          />
        </Modal>
      )}
    </div>
  );
}
