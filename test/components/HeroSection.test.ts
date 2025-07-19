import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import HeroSection from "./HeroSection.astro";

test("HeroSection renders with tagline", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(HeroSection);
	
	expect(result).toContain("AI-Driven Dev Workflows Made Easy");
});

test("HeroSection renders $1.00 Challenge CTA", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(HeroSection);
	
	expect(result).toContain("$1.00 Challenge");
});

test("HeroSection has proper semantic structure", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(HeroSection);
	
	expect(result).toContain("<section");
	expect(result).toContain("role=\"banner\"");
});

test("HeroSection includes call-to-action button", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(HeroSection);
	
	expect(result).toContain("<a");
	expect(result).toContain("href=\"/blog/introducingthedollarchallenge\"");
});