import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe } from "vitest";
import Footer from "./Footer.astro";

describe("Footer Component", () => {
  test("renders the main footer structure", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    expect(result).toMatch(/class="site-footer"/);
    expect(result).toContain("Stack-Junkie");
    expect(result).toContain("Electronics tech turned AI-assisted developer");
  });

  test("includes newsletter signup section", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    expect(result).toContain("footer-newsletter");
    expect(result).toContain("Stay Updated");
  });

  test("includes navigation links", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    expect(result).toContain("Quick Links");
    expect(result).toContain('href="/"');
    expect(result).toContain('href="/blog"');
    expect(result).toContain('href="/projects"');
  });

  test("includes $1.00 Challenge section", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    expect(result).toContain("The $1.00 Challenge");
    expect(result).toContain("Follow my journey");
    expect(result).toContain("AI assistance");
  });

  test("includes copyright notice with current year", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    const currentYear = new Date().getFullYear();
    expect(result).toMatch(new RegExp(`&copy; ${currentYear}`));
    expect(result).toContain("All rights reserved");
  });

  test("has proper semantic HTML structure", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    expect(result).toContain('<footer');
    expect(result).toContain('<nav');
    expect(result).toContain('<h3');
    expect(result).toContain('<h4');
  });

  test("includes responsive design classes", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    expect(result).toContain("footer-content");
    expect(result).toContain("footer-section");
    expect(result).toContain("footer-bottom");
  });

  test("has proper accessibility attributes", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    // Check for navigation landmarks
    expect(result).toContain('<nav');
    expect(result).toContain('class="footer-nav"');
  });
});