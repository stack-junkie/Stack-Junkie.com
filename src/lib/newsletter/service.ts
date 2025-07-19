import type { NewsletterSubmissionData, NewsletterApiResponse } from './types';
import { getNewsletterConfig } from './config';

export class NewsletterService {
  private config = getNewsletterConfig();

  async subscribe(data: NewsletterSubmissionData): Promise<NewsletterApiResponse> {
    const { email, name, source = 'website' } = data;
    
    try {
      const response = await fetch(`${this.config.apiUrl}/forms/${this.config.formId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.config.apiKey,
          email,
          first_name: name,
          tags: [source],
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.message || 'Failed to subscribe to newsletter',
          details: result.errors ? Object.entries(result.errors).map(([field, message]) => ({
            field,
            message: Array.isArray(message) ? message[0] : message,
          })) : undefined,
        };
      }

      return {
        success: true,
        message: 'Successfully subscribed to newsletter!',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  async unsubscribe(email: string): Promise<NewsletterApiResponse> {
    try {
      const response = await fetch(`${this.config.apiUrl}/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.config.apiKey,
          email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.message || 'Failed to unsubscribe from newsletter',
        };
      }

      return {
        success: true,
        message: 'Successfully unsubscribed from newsletter',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }
}

export const newsletterService = new NewsletterService();