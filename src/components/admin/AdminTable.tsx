import type { ReactNode } from 'react';
import { Button } from '@components/ui';

export interface AdminColumn<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface AdminTableProps<T> {
  columns: AdminColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  isLoading?: boolean;
  isForbidden?: boolean;
  emptyMessage?: string;
}

export function AdminTable<T>({
  columns,
  rows,
  rowKey,
  onEdit,
  onDelete,
  isLoading,
  isForbidden,
  emptyMessage = 'Nothing here yet.',
}: AdminTableProps<T>) {
  if (isLoading) return <p className="py-10 text-center text-sm text-primary-dark/50">Loading…</p>;

  if (isForbidden) {
    return (
      <p className="py-10 text-center text-sm text-red-500">
        Your account doesn't have access to this section. Ask an admin to grant the relevant scope.
      </p>
    );
  }

  if (rows.length === 0) {
    return <p className="py-10 text-center text-sm text-primary-dark/50">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-primary-dark/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-xs uppercase text-primary-dark/50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="whitespace-nowrap px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-dark/5">
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td key={col.key} className="max-w-xs truncate px-4 py-3 text-primary-dark/80">
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '—')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <Button variant="outline" size="sm" onClick={() => onEdit(row)}>
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => onDelete(row)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
