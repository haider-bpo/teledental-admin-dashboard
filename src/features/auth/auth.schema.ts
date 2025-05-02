import { z } from 'zod';

export const signinSchema = z.object({
  email: z
    .string()
    .min(5, 'Email must be at least 5 characters long')
    .max(100, 'Email must be at most 100 characters long')
    .email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password must be at most 64 characters long'),
  // .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
  // .regex(/[a-z]/, 'Password must include at least one lowercase letter')
  // .regex(/[0-9]/, 'Password must include at least one number')
  // .regex(/[\W_]/, 'Password must include at least one special character'),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;
