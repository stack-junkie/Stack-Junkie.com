import type { NewsletterServiceConfig } from './types';

export const getNewsletterConfig = (): NewsletterServiceConfig => {
  const apiUrl = import.meta.env.NEWSLETTER_API_URL || 'https://api.convertkit.com/v3';
  const apiKey = import.meta.env.NEWSLETTER_API_KEY;
  const listId = import.meta.env.NEWSLETTER_LIST_ID;
  const formId = import.meta.env.NEWSLETTER_FORM_ID;

  // During build time, return default config if env vars aren't set
  if (!apiKey && import.meta.env.MODE === 'production') {
    console.warn('Newsletter API key not configured - newsletter functionality will be disabled');
    return {
      apiUrl,
      apiKey: 'build-time-placeholder',
      listId,
      formId,
    };
  }

  if (!apiKey) {
    throw new Error('NEWSLETTER_API_KEY environment variable is required');
  }

  return {
    apiUrl,
    apiKey,
    listId,
    formId,
  };
};

export const validateNewsletterConfig = (): boolean => {
  try {
    getNewsletterConfig();
    return true;
  } catch {
    return false;
  }
};

export const getPublicSiteUrl = (): string => {
  return import.meta.env.PUBLIC_SITE_URL || 'https://stack-junkie.com';
};