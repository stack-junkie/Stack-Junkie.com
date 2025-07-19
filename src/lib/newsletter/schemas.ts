import { z } from 'zod';

export const newsletterSubscriptionSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .transform(email => email.toLowerCase()),
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must not exceed 100 characters')
    .optional()
});

export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;