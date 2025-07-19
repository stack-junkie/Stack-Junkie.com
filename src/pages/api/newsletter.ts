import type { APIRoute } from 'astro';
import { newsletterSubscriptionSchema } from '../../lib/newsletter/schemas';
import { newsletterService } from '../../lib/newsletter/service';
import type { NewsletterApiResponse } from '../../lib/newsletter/types';

export const POST: APIRoute = async ({ request }) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed',
    } satisfies NewsletterApiResponse), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid JSON',
      } satisfies NewsletterApiResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate request data
    const validationResult = newsletterSubscriptionSchema.safeParse(body);
    
    if (!validationResult.success) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Validation failed',
        details: validationResult.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      } satisfies NewsletterApiResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract validated data
    const { email, name } = validationResult.data;

    // Prepare submission data with metadata
    const submissionData = {
      email,
      name,
      source: 'website',
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
    };

    // Subscribe to newsletter
    const result = await newsletterService.subscribe(submissionData);

    if (result.success) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify(result), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Newsletter API error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } satisfies NewsletterApiResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Export other HTTP methods to return 405
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: false,
    error: 'Method not allowed',
  } satisfies NewsletterApiResponse), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const PUT: APIRoute = GET;
export const DELETE: APIRoute = GET;
export const PATCH: APIRoute = GET;