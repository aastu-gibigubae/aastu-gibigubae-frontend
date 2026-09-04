import { z } from 'zod';

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[79]\d{8}$/, 'Enter a valid 9-digit Ethiopian phone number'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
