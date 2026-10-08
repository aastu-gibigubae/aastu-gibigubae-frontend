import { useState } from 'react';
import { Button, ImagePlaceholder, Modal } from '@components/ui';
import { AdminTable, type AdminColumn } from '@components/admin/AdminTable';
import { GenericAdminForm, type AdminFieldConfig } from '@components/admin/GenericAdminForm';
import { useGallery } from '@features/gallery/hooks/useGallery';
import { useAdminGalleryMutations } from '@features/gallery/hooks/useAdminGallery';
import type { GalleryImage } from '@features/gallery/types';
import type { GalleryAdminPayload } from '@features/gallery/api';

const FIELDS: AdminFieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'image_url', label: 'Image URL', type: 'url', required: true },
  { name: 'description', label: 'Description (optional)', type: 'textarea' },
];

export default function AdminGallery() {
  const { data, isLoading, error } = useGallery();
  const { create, update, remove } = useAdminGalleryMutations();
  const [editing, setEditing] = useState<GalleryImage | 'new' | null>(null);
  const isForbidden = (error as { response?: { status?: number } } | undefined)?.response?.status === 403;

  const columns: AdminColumn<GalleryImage>[] = [
    { key: 'image_url', label: 'Photo', render: (row) => <ImagePlaceholder round className="h-10 w-10" src={row.image_url} alt={row.title} /> },
    { key: 'title', label: 'Title' },
  ];

  async function handleSubmit(values: Record<string, unknown>) {
    const payload: GalleryAdminPayload = {
      title: values.title as string,
      image_url: values.image_url as string,
      description: (values.description as string) || undefined,
    };
    if (editing === 'new') await create.mutateAsync(payload);
    else if (editing) await update.mutateAsync({ id: editing.id, payload });
    setEditing(null);
  }

  async function handleDelete(row: GalleryImage) {
    if (confirm(`Delete "${row.title}"?`)) await remove.mutateAsync(row.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-primary-dark">Gallery</h1>
        <Button variant="primary" onClick={() => setEditing('new')}>
          New Photo
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
        <Modal title={editing === 'new' ? 'New Photo' : 'Edit Photo'} onClose={() => setEditing(null)}>
          <GenericAdminForm
            fields={FIELDS}
            defaultValues={
              editing === 'new'
                ? { title: '', image_url: '', description: '' }
                : { title: editing.title, image_url: editing.image_url, description: editing.description ?? '' }
            }
            onSubmit={handleSubmit}
            submitLabel={editing === 'new' ? 'Add Photo' : 'Save Changes'}
            error={create.isError || update.isError ? 'Something went wrong. Please try again.' : null}
          />
        </Modal>
      )}
    </div>
  );
}
