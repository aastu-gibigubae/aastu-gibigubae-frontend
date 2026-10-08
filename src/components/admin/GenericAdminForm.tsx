import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '@components/ui';

export type AdminFieldType = 'text' | 'textarea' | 'number' | 'url' | 'checkbox' | 'datetime-local' | 'select';

export interface AdminFieldConfig {
  name: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  helperText?: string;
  options?: { label: string; value: string }[];
}

interface GenericAdminFormProps {
  fields: AdminFieldConfig[];
  defaultValues: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
  submitLabel?: string;
  error?: string | null;
}

/**
 * Trades per-resource Zod schemas for HTML-level validation (required,
 * min/max via register options) — reasonable for an internal admin tool
 * covering 9 resource types; revisit with real schemas if this panel grows
 * public-facing forms of its own.
 */
export function GenericAdminForm({ fields, defaultValues, onSubmit, submitLabel = 'Save', error }: GenericAdminFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className="space-y-4"
      noValidate
    >
      {fields.map((field) => {
        const fieldError = errors[field.name]?.message as string | undefined;

        if (field.type === 'textarea') {
          return (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label htmlFor={field.name} className="text-sm font-body text-primary-dark/80">
                {field.label}
              </label>
              <textarea
                id={field.name}
                rows={4}
                className="w-full rounded-lg border border-primary-dark/15 bg-white px-4 py-2.5 text-sm font-body text-primary-dark outline-none placeholder:text-primary-dark/40 focus:border-primary-dark/40"
                {...register(field.name, { required: field.required && `${field.label} is required` })}
              />
              {fieldError && <p className="text-xs text-red-500">{fieldError}</p>}
              {field.helperText && !fieldError && <p className="text-xs text-primary-dark/40">{field.helperText}</p>}
            </div>
          );
        }

        if (field.type === 'checkbox') {
          return (
            <label key={field.name} className="flex items-center gap-2 text-sm text-primary-dark/80">
              <input type="checkbox" className="h-4 w-4 rounded border-primary-dark/30" {...register(field.name)} />
              {field.label}
            </label>
          );
        }

        if (field.type === 'select') {
          return (
            <Select
              key={field.name}
              label={field.label}
              options={field.options ?? []}
              error={fieldError}
              {...register(field.name, { required: field.required && `${field.label} is required` })}
            />
          );
        }

        return (
          <Input
            key={field.name}
            label={field.label}
            type={field.type === 'url' ? 'text' : field.type}
            error={fieldError}
            {...register(field.name, {
              required: field.required && `${field.label} is required`,
              valueAsNumber: field.type === 'number',
            })}
          />
        );
      })}

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </Button>
    </form>
  );
}
