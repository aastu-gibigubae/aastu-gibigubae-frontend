import { useState } from 'react';
import { Modal } from '@components/ui';
import { AdminTable, type AdminColumn } from '@components/admin/AdminTable';
import { GenericAdminForm, type AdminFieldConfig } from '@components/admin/GenericAdminForm';
import { useAdminSubscriptionMutations, useAdminSubscriptions } from '@features/donations/hooks/useAdminDonations';
import type { Subscription } from '@features/donations/types';

const STATUS_OPTIONS = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'Rejected', value: 'REJECTED' },
];

const FIELDS: AdminFieldConfig[] = [
  { name: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTIONS },
  { name: 'admin_note', label: 'Admin note (optional)', type: 'textarea' },
];

export default function AdminDonations() {
  const { data, isLoading, error } = useAdminSubscriptions();
  const { update } = useAdminSubscriptionMutations();
  const [editing, setEditing] = useState<Subscription | null>(null);
  const isForbidden = (error as { response?: { status?: number } } | undefined)?.response?.status === 403;

  const columns: AdminColumn<Subscription>[] = [
    { key: 'full_name', label: 'Name' },
    { key: 'phone_number', label: 'Phone' },
    { key: 'package', label: 'Package' },
    { key: 'amount', label: 'Amount', render: (row) => `${row.amount} ETB` },
    { key: 'status', label: 'Status' },
  ];

  async function handleSubmit(values: Record<string, unknown>) {
    if (!editing) return;
    await update.mutateAsync({
      id: editing.id,
      payload: { status: values.status as Subscription['status'], admin_note: (values.admin_note as string) || undefined },
    });
    setEditing(null);
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary-dark">Alehu Bewere — Subscriptions</h1>
      <p className="mt-1 text-xs text-primary-dark/50">
        Subscriptions come from public visitors — admins can only review status and add notes here.
      </p>

      <div className="mt-6">
        <AdminTable
          columns={columns}
          rows={data ?? []}
          rowKey={(row) => row.id}
          onEdit={setEditing}
          isLoading={isLoading}
          isForbidden={isForbidden}
        />
      </div>

      {editing && (
        <Modal title={`Update — ${editing.full_name}`} onClose={() => setEditing(null)}>
          <GenericAdminForm
            fields={FIELDS}
            defaultValues={{ status: editing.status, admin_note: editing.admin_note ?? '' }}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            error={update.isError ? 'Something went wrong. Please try again.' : null}
          />
        </Modal>
      )}
    </div>
  );
}
