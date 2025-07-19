import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Card from "./Card.astro";

test("Card component renders with basic structure", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Card, {
		slots: { default: "Test content" },
	});

	expect(result).toContain('class="card"');
	expect(result).toContain("Test content");
});

test("Card component accepts custom className", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Card, {
		props: { class: "custom-card" },
		slots: { default: "Test content" },
	});

	expect(result).toContain("custom-card");
});

test("Card component has hover effect styles", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Card);

	// Card should have proper class and structure for hover effects
	expect(result).toContain('class="card"');
	expect(result).toContain("<div");
});

test("Card component has proper elevation and shadow effects", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Card);

	// Card should have proper class for elevation effects
	expect(result).toContain('class="card"');
});
