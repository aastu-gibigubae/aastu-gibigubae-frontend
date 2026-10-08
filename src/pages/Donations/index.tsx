import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, Button, Input } from '@components/ui';
import { useDonationPackages, useSubmitSubscription } from '@features/donations/hooks/useDonations';
import { isCustomPackage } from '@features/donations/types';
import { subscriptionSchema, type SubscriptionFormValues } from './subscriptionSchema';

function formatPackageName(name: string): string {
  return name
    .toLowerCase()
    .split('_')
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Donations() {
  const { data: packages, isLoading, isError } = useDonationPackages();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const submitSubscription = useSubmitSubscription();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscriptionFormValues>({ resolver: zodResolver(subscriptionSchema) });

  const selectedPackage = packages?.find((pkg) => pkg.id === selectedId);
  const isCustom = selectedPackage ? isCustomPackage(selectedPackage) : false;

  async function onSubmit(values: SubscriptionFormValues) {
    if (!selectedPackage) return;
    if (isCustom && !values.amount) return; // custom amount is required — caught by the inline message below

    await submitSubscription.mutateAsync({
      full_name: values.fullName,
      phone_number: `+251${values.phone}`,
      package_name: selectedPackage.name,
      amount: isCustom ? Number(values.amount) : undefined,
      email: values.email || undefined,
    });
    reset();
    setSelectedId(null);
  }

  return (
    <PageContainer className="py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Alehu Bewere' }]} />
      <h1 className="mt-3 font-heading text-2xl text-primary-dark">Alehu Bewere</h1>
      <p className="mt-2 max-w-xl text-sm text-primary-dark/60">
        Choose a contribution package below to support the community's ministry and outreach.
      </p>

      {isLoading && <p className="mt-8 text-sm text-primary-dark/50">Loading packages…</p>}
      {isError && <p className="mt-8 text-sm text-red-500">Couldn't load donation packages right now.</p>}

      {packages && packages.length > 0 && (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedId(pkg.id)}
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  selectedId === pkg.id ? 'border-primary bg-primary/5' : 'border-primary-dark/10 hover:border-primary-dark/30'
                }`}
              >
                <h3 className="font-heading text-base text-primary-dark">{formatPackageName(pkg.name)}</h3>
                <p className="mt-1 text-lg font-medium text-primary">
                  {isCustomPackage(pkg) ? 'Custom amount' : `${pkg.amount} ETB`}
                </p>
                {pkg.description && <p className="mt-2 text-xs text-primary-dark/60">{pkg.description}</p>}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-primary-dark/10 p-6">
            <h2 className="font-heading text-lg text-primary-dark">
              {selectedPackage ? `Give to ${formatPackageName(selectedPackage.name)}` : 'Select a package to continue'}
            </h2>

            {submitSubscription.isSuccess && (
              <p role="status" className="mt-4 rounded-lg bg-primary-dark/5 px-4 py-3 text-sm text-primary-dark">
                Thanks — your subscription has been submitted. Our team will follow up with you soon.
              </p>
            )}

            {selectedPackage && (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
                <Input label="Full name" error={errors.fullName?.message} {...register('fullName')} />
                <Input
                  label="Phone number"
                  placeholder="+251 Phone number"
                  inputMode="numeric"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
                <Input label="Email (optional)" type="email" error={errors.email?.message} {...register('email')} />
                {isCustom && (
                  <Input
                    label="Amount (ETB)"
                    type="number"
                    min="1"
                    error={errors.amount?.message}
                    {...register('amount')}
                  />
                )}

                {submitSubscription.isError && (
                  <p role="alert" className="text-sm text-red-500">
                    Something went wrong submitting your subscription. Please try again.
                  </p>
                )}

                <Button type="submit" variant="accent" fullWidth disabled={submitSubscription.isPending}>
                  {submitSubscription.isPending ? 'Submitting…' : 'Give Now'}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
