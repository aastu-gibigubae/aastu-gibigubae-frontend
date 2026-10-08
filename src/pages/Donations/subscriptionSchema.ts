import { z } from 'zod';

export const subscriptionSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Keep it under 100 characters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[79]\d{8}$/, 'Enter a valid 9-digit Ethiopian phone number'),
  email: z.union([z.string().email('Enter a valid email address'), z.literal('')]).optional(),
  amount: z.string().optional(),
});

export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;
