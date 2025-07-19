// Test to verify gradient changes are actually applied
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Layout from '../layouts/Layout.astro';

describe('Background Gradient Test', () => {
  it('should have the mirrored gradient applied', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Layout, {
      props: {
        title: 'Test Page',
        description: 'Test Description'
      },
    });

    // Check if the gradient CSS is present
    expect(result).toContain('linear-gradient(180deg, #000000 0%, #000000 20%, #71e9db 50%, #000000 80%, #000000 100%)');
    
    // Check if the radial gradient is present
    expect(result).toContain('radial-gradient(ellipse at center, #71e9db 30%, #000000 70%)');
  });

  it('should not have solid background overriding the gradient', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Layout, {
      props: {
        title: 'Test Page',
        description: 'Test Description'
      },
    });

    // This should fail if body has background-color that blocks gradient
    expect(result).not.toContain('body{background-color:#0b0b0b}');
  });
});