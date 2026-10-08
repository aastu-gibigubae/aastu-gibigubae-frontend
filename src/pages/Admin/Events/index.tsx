import { useState } from 'react';
import { Button, Modal, Pagination } from '@components/ui';
import { AdminTable, type AdminColumn } from '@components/admin/AdminTable';
import { GenericAdminForm, type AdminFieldConfig } from '@components/admin/GenericAdminForm';
import { useAdminEventMutations, useAdminEvents } from '@features/events/hooks/useAdminEvents';
import type { EventAdminPayload } from '@features/events/api';
import type { EventItem } from '@features/events/types';
import { formatEventDate } from '@features/events/format';

const FIELDS: AdminFieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'location', label: 'Location', type: 'text', required: true },
  { name: 'eventDate', label: 'Event date & time', type: 'datetime-local', required: true },
  { name: 'userId', label: 'Organizer user ID (UUID)', type: 'text', required: true, helperText: 'No user lookup exists yet — paste the UUID directly.' },
  { name: 'imageUrl', label: 'Image URL', type: 'url' },
  { name: 'isPublished', label: 'Published', type: 'checkbox' },
];

function toIsoLocal(value: string): string {
  return value ? new Date(value).toISOString() : '';
}

function fromIsoLocal(value: string): string {
  if (!value) return '';
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminEvents() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useAdminEvents(page);
  const { create, update, remove } = useAdminEventMutations();
  const [editing, setEditing] = useState<EventItem | 'new' | null>(null);
  const isForbidden = (error as { response?: { status?: number } } | undefined)?.response?.status === 403;

  const columns: AdminColumn<EventItem>[] = [
    { key: 'title', label: 'Title' },
    { key: 'event_date', label: 'Date', render: (row) => formatEventDate(row.event_date) },
    { key: 'location', label: 'Location' },
    { key: 'is_published', label: 'Status', render: (row) => (row.is_published ? 'Published' : 'Draft') },
  ];

  async function handleSubmit(values: Record<string, unknown>) {
    const payload: EventAdminPayload = {
      title: values.title as string,
      description: values.description as string,
      location: values.location as string,
      eventDate: toIsoLocal(values.eventDate as string),
      userId: values.userId as string,
      imageUrl: (values.imageUrl as string) || undefined,
      isPublished: Boolean(values.isPublished),
    };

    if (editing === 'new') {
      await create.mutateAsync(payload);
    } else if (editing) {
      await update.mutateAsync({ id: editing.id, payload });
    }
    setEditing(null);
  }

  async function handleDelete(row: EventItem) {
    if (confirm(`Delete "${row.title}"?`)) await remove.mutateAsync(row.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-primary-dark">Events</h1>
        <Button variant="primary" onClick={() => setEditing('new')}>
          New Event
        </Button>
      </div>

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
        <Modal title={editing === 'new' ? 'New Event' : 'Edit Event'} onClose={() => setEditing(null)}>
          <GenericAdminForm
            fields={FIELDS}
            defaultValues={
              editing === 'new'
                ? { title: '', description: '', location: '', eventDate: '', userId: '', imageUrl: '', isPublished: false }
                : {
                    title: editing.title,
                    description: editing.description,
                    location: editing.location,
                    eventDate: fromIsoLocal(editing.event_date),
                    userId: editing.userId,
                    imageUrl: editing.image_url ?? '',
                    isPublished: editing.is_published,
                  }
            }
            onSubmit={handleSubmit}
            submitLabel={editing === 'new' ? 'Create Event' : 'Save Changes'}
            error={create.isError || update.isError ? 'Something went wrong. Please try again.' : null}
          />
        </Modal>
      )}
    </div>
  );
}
