export interface NewsletterSubscription {
  email: string;
  name?: string;
}

export interface NewsletterFormProps {
  variant?: 'footer' | 'modal' | 'inline';
  showName?: boolean;
  buttonText?: string;
  placeholder?: string;
  namePlaceholder?: string;
  className?: string;
  onSuccess?: (data: NewsletterSubscription) => void;
  onError?: (error: string) => void;
}

export interface NewsletterFormState {
  email: string;
  name: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: {
    email?: string;
    name?: string;
    submit?: string;
  };
}

export interface NewsletterApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface NewsletterServiceConfig {
  apiUrl: string;
  apiKey: string;
  listId?: string;
  formId?: string;
  source?: string;
}

export interface NewsletterValidationError {
  field: string;
  message: string;
  code: string;
}

export interface NewsletterSubmissionData {
  email: string;
  name?: string;
  source?: string;
  timestamp?: string;
  userAgent?: string;
  referrer?: string;
}