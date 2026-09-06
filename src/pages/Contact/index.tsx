import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, Button, ImagePlaceholder, Input } from '@components/ui';
import { contactSchema, type ContactFormValues } from './contactSchema';

const CONTACT_INFO = [
  { label: 'Email Address', value: 'info@gmail.com' },
  { label: 'Phone Support', value: '+251 911 111 111' },
  { label: 'Location', value: 'AASTU' },
];

/**
 * No backend endpoint exists for contact submissions yet (not in the SRS,
 * unlike auth) — so this validates client-side and shows a confirmation
 * message rather than actually sending anything. Swap `onSubmit` for a real
 * POST once that endpoint exists.
 */
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitted(true);
    reset();
  }

  return (
    <PageContainer className="py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />
      <h1 className="mt-3 font-heading text-2xl text-primary-dark">Contact Us</h1>
      <p className="mt-2 max-w-xl text-sm text-primary-dark/60">
        Have a question or want to get involved? Send us a message and our coordination team will get back to you
        shortly.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-primary-dark/10 p-6 sm:p-8">
          <h2 className="font-heading text-xl text-primary-dark">Send Us a Message</h2>
          <p className="mt-1 text-sm text-primary-dark/60">
            Fill out the form below and our coordination team will get back to you shortly
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
            {submitted && (
              <p role="status" className="rounded-lg bg-primary-dark/5 px-4 py-3 text-sm text-primary-dark">
                Thanks for reaching out — we'll get back to you soon.
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First Name" placeholder="First Name" error={errors.firstName?.message} {...register('firstName')} />
              <Input label="Last Name" placeholder="Last Name" error={errors.lastName?.message} {...register('lastName')} />
            </div>
            <Input label="Email" type="email" placeholder="Email" error={errors.email?.message} {...register('email')} />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-body text-primary-dark/80">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Please enter your message here …"
                className="w-full rounded-lg border border-primary-dark/15 bg-white px-4 py-2.5 text-sm font-body text-primary-dark outline-none placeholder:text-primary-dark/40 focus:border-primary-dark/40"
                {...register('message')}
              />
              {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
            </div>

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="font-heading text-lg text-primary-dark">Contact Information</h2>
          <div className="mt-4 space-y-4">
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="rounded-lg border border-primary-dark/10 p-4">
                <p className="text-xs text-primary-dark/50">{item.label}</p>
                <p className="mt-1 text-sm font-medium text-primary-dark">{item.value}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-6 font-heading text-lg text-primary-dark">Find us</h2>
          <ImagePlaceholder aspect="aspect-square" className="mt-4" />
        </div>
      </div>
    </PageContainer>
  );
}
