import { useState } from 'react';
import { Button, Modal } from '@components/ui';
import { AdminTable, type AdminColumn } from '@components/admin/AdminTable';
import { GenericAdminForm, type AdminFieldConfig } from '@components/admin/GenericAdminForm';
import { useAdminMagazineMutations, useAdminMagazines } from '@features/magazine/hooks/useAdminMagazine';
import type { MagazineIssue } from '@features/magazine/types';
import type { MagazineAdminPayload } from '@features/magazine/api';

const FIELDS: AdminFieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'pdfUrl', label: 'PDF URL', type: 'url', required: true },
  { name: 'userId', label: 'Author user ID (UUID)', type: 'text', required: true, helperText: 'No user lookup exists yet — paste the UUID directly.' },
  { name: 'coverImage', label: 'Cover image URL (optional)', type: 'url' },
  { name: 'content', label: 'Content (optional)', type: 'textarea' },
];

export default function AdminMagazine() {
  const { data, isLoading, error } = useAdminMagazines();
  const { create, update, remove } = useAdminMagazineMutations();
  const [editing, setEditing] = useState<MagazineIssue | 'new' | null>(null);
  const isForbidden = (error as { response?: { status?: number } } | undefined)?.response?.status === 403;

  const columns: AdminColumn<MagazineIssue>[] = [
    { key: 'title', label: 'Title' },
    { key: 'published_at', label: 'Published', render: (row) => new Date(row.published_at).toLocaleDateString() },
  ];

  async function handleSubmit(values: Record<string, unknown>) {
    const payload: MagazineAdminPayload = {
      title: values.title as string,
      pdfUrl: values.pdfUrl as string,
      userId: values.userId as string,
      coverImage: (values.coverImage as string) || undefined,
      content: (values.content as string) || undefined,
    };
    if (editing === 'new') await create.mutateAsync(payload);
    else if (editing) await update.mutateAsync({ id: editing.id, payload });
    setEditing(null);
  }

  async function handleDelete(row: MagazineIssue) {
    if (confirm(`Delete "${row.title}"?`)) await remove.mutateAsync(row.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-primary-dark">Magazine</h1>
        <Button variant="primary" onClick={() => setEditing('new')}>
          New Issue
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
        <Modal title={editing === 'new' ? 'New Issue' : 'Edit Issue'} onClose={() => setEditing(null)}>
          <GenericAdminForm
            fields={FIELDS}
            defaultValues={
              editing === 'new'
                ? { title: '', pdfUrl: '', userId: '', coverImage: '', content: '' }
                : {
                    title: editing.title,
                    pdfUrl: editing.pdf_url,
                    userId: '',
                    coverImage: editing.cover_image ?? '',
                    content: editing.content ?? '',
                  }
            }
            onSubmit={handleSubmit}
            submitLabel={editing === 'new' ? 'Create Issue' : 'Save Changes'}
            error={create.isError || update.isError ? 'Something went wrong. Please try again.' : null}
          />
        </Modal>
      )}
    </div>
  );
}
