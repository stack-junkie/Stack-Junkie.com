import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, test } from "vitest";
import Navbar from "./Navbar.astro";

describe("Navbar Component", () => {
	test("renders site title", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Navbar, {
			request: new Request("https://stack-junkie.com/"),
		});

		expect(result).toContain("Stack-Junkie");
		expect(result).toContain('class="site-title"');
	});

	test("renders navigation links", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Navbar, {
			request: new Request("https://stack-junkie.com/"),
		});

		expect(result).toContain('href="/blog"');
		expect(result).toContain('href="/projects"');
		expect(result).toContain(">Blog</a>");
		expect(result).toContain(">Projects</a>");
	});

	test("marks active navigation link for blog page", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Navbar, {
			request: new Request("https://stack-junkie.com/blog"),
		});

		expect(result).toContain('class="active"');
	});

	test("marks active navigation link for projects page", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Navbar, {
			request: new Request("https://stack-junkie.com/projects"),
		});

		expect(result).toContain('class="active"');
	});

	test("includes search functionality", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Navbar, {
			request: new Request("https://stack-junkie.com/"),
		});

		expect(result).toContain('id="search"');
		expect(result).toContain('placeholder="Search (Ctrl+K)"');
		expect(result).toContain('id="search-results"');
	});

	test("includes mobile navigation toggle", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Navbar, {
			request: new Request("https://stack-junkie.com/"),
		});

		expect(result).toContain('class="mobile-nav-toggle"');
		expect(result).toContain('class="menu-closed"');
		expect(result).toContain('class="menu-open"');
	});

	test("includes keyboard navigation script", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Navbar, {
			request: new Request("https://stack-junkie.com/"),
		});

		expect(result).toContain("e.key === 'k' && e.ctrlKey");
		expect(result).toContain("ArrowDown");
		expect(result).toContain("ArrowUp");
		expect(result).toContain("Escape");
	});
});
