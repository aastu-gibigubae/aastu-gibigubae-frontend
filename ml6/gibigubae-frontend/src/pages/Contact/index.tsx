import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, Button, Input } from '@components/ui';
import { contactSchema, type ContactFormValues } from './contactSchema';

const CONTACT_INFO = [
  { label: 'Address', value: 'AASTU, Addis Ababa, Ethiopia' },
  { label: 'Phone', value: '+251-974-15-0725' },
  { label: 'Email', value: 'companyemail@example.com' },
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
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      <h1 className="mt-3 font-heading text-2xl text-primary-dark">Contact Us</h1>
      <p className="mt-2 max-w-md text-sm text-primary-dark/60">
        Have a question or want to get involved? Send us a message and we'll get back to you.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          {CONTACT_INFO.map((item) => (
            <div key={item.label} className="rounded-2xl bg-surface p-4">
              <p className="text-xs text-primary-dark/50">{item.label}</p>
              <p className="mt-1 text-sm text-primary-dark">{item.value}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {submitted && (
            <p role="status" className="rounded-lg bg-primary-dark/5 px-4 py-3 text-sm text-primary-dark">
              Thanks for reaching out — we'll get back to you soon.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" placeholder="Your name" error={errors.name?.message} {...register('name')} />
            <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
          </div>
          <Input label="Subject" placeholder="What's this about?" error={errors.subject?.message} {...register('subject')} />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-body text-primary-dark/80">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Write your message here…"
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
    </PageContainer>
  );
}
