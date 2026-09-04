import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[79]\d{8}$/, 'Enter a valid 9-digit Ethiopian phone number'),
  gender: z.enum(['male', 'female'], { message: 'Select a gender' }),
  department: z.string().min(1, 'Select a department'),
  studentId: z
    .string()
    .min(1, 'Student ID is required')
    .regex(/^[A-Za-z]{2,4}\d{3}\/\d{2}$/, 'Format: ETS201/18'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
