import { describe, it, expect } from 'vitest';
import { newsletterSubscriptionSchema, type NewsletterSubscription } from './schemas';

describe('Newsletter Validation Schemas', () => {
  describe('newsletterSubscriptionSchema', () => {
    it('should validate a valid email and name', () => {
      const validData = {
        email: 'test@example.com',
        name: 'John Doe'
      };

      const result = newsletterSubscriptionSchema.safeParse(validData);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.email).toBe('test@example.com');
        expect(result.data.name).toBe('John Doe');
      }
    });

    it('should validate with just email (name optional)', () => {
      const validData = {
        email: 'test@example.com'
      };

      const result = newsletterSubscriptionSchema.safeParse(validData);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.email).toBe('test@example.com');
        expect(result.data.name).toBeUndefined();
      }
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        'test@',
        '@example.com',
        'test.example.com',
        'test@.com',
        'test@example.',
        ''
      ];

      invalidEmails.forEach(email => {
        const result = newsletterSubscriptionSchema.safeParse({ email });
        expect(result.success).toBe(false);
        
        if (!result.success) {
          expect(result.error.issues.some(issue => 
            issue.path.includes('email') && issue.code === 'invalid_string'
          )).toBe(true);
        }
      });
    });

    it('should reject names that are too short', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'test@example.com',
        name: 'A'
      });

      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues.some(issue => 
          issue.path.includes('name') && issue.code === 'too_small'
        )).toBe(true);
      }
    });

    it('should reject names that are too long', () => {
      const longName = 'A'.repeat(101);
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'test@example.com',
        name: longName
      });

      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues.some(issue => 
          issue.path.includes('name') && issue.code === 'too_big'
        )).toBe(true);
      }
    });

    it('should trim whitespace from email and name', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: '  test@example.com  ',
        name: '  John Doe  '
      });

      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.email).toBe('test@example.com');
        expect(result.data.name).toBe('John Doe');
      }
    });

    it('should reject empty strings after trimming', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: '   ',
        name: '   '
      });

      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues.some(issue => 
          issue.path.includes('email')
        )).toBe(true);
      }
    });

    it('should handle special characters in names correctly', () => {
      const validNames = [
        'José María',
        "O'Connor",
        'Jean-Pierre',
        '李小明',
        'François'
      ];

      validNames.forEach(name => {
        const result = newsletterSubscriptionSchema.safeParse({
          email: 'test@example.com',
          name
        });

        expect(result.success).toBe(true);
        
        if (result.success) {
          expect(result.data.name).toBe(name);
        }
      });
    });

    it('should normalize email to lowercase', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'TEST@EXAMPLE.COM',
        name: 'John Doe'
      });

      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.email).toBe('test@example.com');
      }
    });
  });
});