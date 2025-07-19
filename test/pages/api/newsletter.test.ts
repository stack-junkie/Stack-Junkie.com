import { expect, test, describe, vi, beforeEach } from 'vitest';
import { POST } from './newsletter';

// Mock the newsletter service
vi.mock('../../lib/newsletter/service', () => ({
  newsletterService: {
    subscribe: vi.fn(),
  },
}));

describe('Newsletter API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns 405 for non-POST requests', async () => {
    const request = new Request('http://localhost/api/newsletter', {
      method: 'GET',
    });

    const response = await POST({ request } as any);
    const result = await response.json();

    expect(response.status).toBe(405);
    expect(result.error).toBe('Method not allowed');
  });

  test('validates required email field', async () => {
    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'John Doe' }),
    });

    const response = await POST({ request } as any);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Validation failed');
    expect(result.details).toBeDefined();
  });

  test('validates email format', async () => {
    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalid-email' }),
    });

    const response = await POST({ request } as any);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Validation failed');
    expect(result.details).toBeDefined();
  });

  test('accepts valid email without name', async () => {
    const { newsletterService } = await import('../../lib/newsletter/service');
    
    vi.mocked(newsletterService.subscribe).mockResolvedValue({
      success: true,
      message: 'Successfully subscribed!',
    });

    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const response = await POST({ request } as any);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Successfully subscribed!');
  });

  test('accepts valid email with name', async () => {
    const { newsletterService } = await import('../../lib/newsletter/service');
    
    vi.mocked(newsletterService.subscribe).mockResolvedValue({
      success: true,
      message: 'Successfully subscribed!',
    });

    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: 'test@example.com',
        name: 'John Doe'
      }),
    });

    const response = await POST({ request } as any);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(newsletterService.subscribe).toHaveBeenCalledWith({
      email: 'test@example.com',
      name: 'John Doe',
      source: 'website',
      timestamp: expect.any(String),
      userAgent: undefined,
      referrer: undefined,
    });
  });

  test('handles service errors', async () => {
    const { newsletterService } = await import('../../lib/newsletter/service');
    
    vi.mocked(newsletterService.subscribe).mockResolvedValue({
      success: false,
      error: 'Email already subscribed',
    });

    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const response = await POST({ request } as any);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Email already subscribed');
  });

  test('handles network errors', async () => {
    const { newsletterService } = await import('../../lib/newsletter/service');
    
    vi.mocked(newsletterService.subscribe).mockRejectedValue(new Error('Network error'));

    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const response = await POST({ request } as any);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Network error');
  });

  test('handles malformed JSON', async () => {
    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json',
    });

    const response = await POST({ request } as any);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Invalid JSON');
  });

  test('normalizes email to lowercase', async () => {
    const { newsletterService } = await import('../../lib/newsletter/service');
    
    vi.mocked(newsletterService.subscribe).mockResolvedValue({
      success: true,
      message: 'Successfully subscribed!',
    });

    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'TEST@EXAMPLE.COM' }),
    });

    const response = await POST({ request } as any);
    
    expect(newsletterService.subscribe).toHaveBeenCalledWith({
      email: 'test@example.com',
      source: 'website',
      timestamp: expect.any(String),
      userAgent: undefined,
      referrer: undefined,
    });
  });

  test('includes user agent when available', async () => {
    const { newsletterService } = await import('../../lib/newsletter/service');
    
    vi.mocked(newsletterService.subscribe).mockResolvedValue({
      success: true,
      message: 'Successfully subscribed!',
    });

    const request = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 Test Browser',
      },
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const response = await POST({ request } as any);
    
    expect(newsletterService.subscribe).toHaveBeenCalledWith({
      email: 'test@example.com',
      name: undefined,
      source: 'website',
      timestamp: expect.any(String),
      userAgent: 'Mozilla/5.0 Test Browser',
      referrer: undefined,
    });
  });
});