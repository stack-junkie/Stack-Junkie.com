// @vitest-environment happy-dom
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, test } from "vitest";
import Layout from "./Layout.astro";

describe("Layout Component", () => {
	test("renders basic HTML structure with title", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Layout, {
			props: {
				title: "Test Page Title",
			},
		});

		expect(result).toContain('<html lang="en">');
		expect(result).toContain("<title>Test Page Title</title>");
		expect(result).toContain("<main data-astro-source-file");
	});

	test("includes meta description when provided", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Layout, {
			props: {
				title: "Test Page",
				description: "Test page description",
			},
		});

		expect(result).toContain(
			'<meta name="description" content="Test page description"',
		);
		expect(result).toContain(
			'<meta name="og:description" content="Test page description"',
		);
	});

	test("excludes meta description when not provided", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Layout, {
			props: {
				title: "Test Page",
			},
		});

		expect(result).not.toContain('<meta name="description"');
		expect(result).not.toContain('<meta name="og:description"');
	});

	test("includes article metadata when article prop provided", async () => {
		const container = await AstroContainer.create();
		const testDate = new Date("2025-01-15T10:00:00Z");
		const result = await container.renderToString(Layout, {
			props: {
				title: "Test Article",
				article: {
					createdAt: testDate,
				},
			},
		});

		expect(result).toContain('<meta name="og:type" content="article"');
		expect(result).toContain(
			`<meta property="article:published_time" content="${testDate.toISOString()}"`,
		);
	});

	test("includes footer component", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Layout, {
			props: {
				title: "Test Page",
			},
		});

		expect(result).toMatch(/class="site-footer"/);
		expect(result).toContain("Stack-Junkie");
	});

	test("includes newsletter signup in footer", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Layout, {
			props: {
				title: "Test Page",
			},
		});

		expect(result).toContain("footer-newsletter");
		expect(result).toContain("Stay Updated");
	});

	test("includes navigation links in footer", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Layout, {
			props: {
				title: "Test Page",
			},
		});

		expect(result).toContain("Quick Links");
		expect(result).toContain('href="/"');
		expect(result).toContain('href="/blog"');
		expect(result).toContain('href="/projects"');
	});

	test("includes proper footer structure and copyright", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Layout, {
			props: {
				title: "Test Page",
			},
		});

		const currentYear = new Date().getFullYear();
		expect(result).toMatch(new RegExp(`&copy; ${currentYear}`));
		expect(result).toContain("All rights reserved");
		expect(result).toContain("footer-bottom");
	});
});
