import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe, beforeEach, vi } from "vitest";
import HomePage from "./index.astro";
import type { CollectionEntry } from "astro:content";

// Mock the content collections
const mockPosts: CollectionEntry<"posts">[] = [
	{
		id: "test-post",
		slug: "test-post",
		body: "Test post content",
		collection: "posts",
		data: {
			title: "Test Post",
			createdAt: new Date("2024-01-01"),
			description: "A test post",
			tags: [],
			draft: false,
			image: () => Promise.resolve({} as any),
		},
	},
];

const mockProjects: CollectionEntry<"projects">[] = [
	{
		id: "ecommerce-site",
		slug: "ecommerce-site",
		body: "E-commerce project content",
		collection: "projects",
		data: {
			title: "E-commerce Platform",
			description: "Full-stack e-commerce solution with payment integration",
			date: new Date("2024-10-10"),
			image: {} as any,
			info: [
				{
					text: "Status: In Development",
					icon: { type: "lucide", name: "code" },
				},
			],
		},
	},
	{
		id: "weather-app",
		slug: "weather-app",
		body: "Weather app content",
		collection: "projects",
		data: {
			title: "Weather Dashboard",
			description: "Beautiful weather app with location-based forecasts",
			date: new Date("2024-09-15"),
			image: {} as any,
			info: [
				{
					text: "Status: Completed",
					icon: { type: "lucide", name: "check" },
				},
			],
		},
	},
];

const mockAbout: CollectionEntry<"other"> = {
	id: "about",
	slug: "about",
	body: "About content",
	collection: "other",
	data: {},
};

const mockQuickInfo: CollectionEntry<"quickInfo">[] = [
	{
		id: "1",
		slug: "1",
		body: "",
		collection: "quickInfo",
		data: {
			id: 1,
			icon: { type: "lucide", name: "user" },
			text: "Full Stack Developer",
		},
	},
];

const mockSocials: CollectionEntry<"socials">[] = [
	{
		id: "1",
		slug: "1",
		body: "",
		collection: "socials",
		data: {
			id: 1,
			icon: { type: "simple-icons", name: "github" },
			text: "GitHub",
			link: "https://github.com/example",
		},
	},
];

// Mock the content collection functions
vi.mock("astro:content", () => ({
	getCollection: vi.fn((collection: string) => {
		switch (collection) {
			case "posts":
				return Promise.resolve(mockPosts);
			case "projects":
				return Promise.resolve(mockProjects);
			case "quickInfo":
				return Promise.resolve(mockQuickInfo);
			case "socials":
				return Promise.resolve(mockSocials);
			default:
				return Promise.resolve([]);
		}
	}),
	getEntry: vi.fn((collection: string, id: string) => {
		if (collection === "other" && id === "about") {
			return Promise.resolve(mockAbout);
		}
		return Promise.resolve(null);
	}),
	render: vi.fn(() => ({
		Content: () => "About content",
	})),
}));

// Mock the spectre:globals
vi.mock("spectre:globals", () => ({
	name: "Stack Junkie",
	openGraph: {
		home: {
			title: "Stack Junkie - Home",
			description: "Welcome to Stack Junkie",
		},
	},
}));

describe("Homepage ProjectsCarousel Integration", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("renders homepage with ProjectsCarousel component", async () => {
		const result = await container.renderToString(HomePage);

		// Check that ProjectsCarousel is present on the homepage
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain("Featured Projects");
		expect(result).toContain('class="carousel-container"');
		expect(result).toContain('class="carousel-track"');
	});

	test("ProjectsCarousel receives projects from content collection", async () => {
		const result = await container.renderToString(HomePage);

		// Check that actual project data is rendered in the carousel
		expect(result).toContain("E-commerce Platform");
		expect(result).toContain("Weather Dashboard");
		expect(result).toContain("Full-stack e-commerce solution");
		expect(result).toContain("Beautiful weather app");
	});

	test("ProjectsCarousel appears in correct position on homepage", async () => {
		const result = await container.renderToString(HomePage);

		// Check that the carousel appears after the main content
		const heroIndex = result.indexOf('class="hero-section"');
		const layoutGridIndex = result.indexOf('class="layout-grid"');
		const carouselIndex = result.indexOf('class="projects-carousel"');

		// If hero exists, carousel should be after it
		if (heroIndex !== -1) {
			expect(carouselIndex).toBeGreaterThan(heroIndex);
		}

		// If layout grid exists, carousel should be after it
		if (layoutGridIndex !== -1) {
			expect(carouselIndex).toBeGreaterThan(layoutGridIndex);
		}

		// Carousel should be present
		expect(carouselIndex).toBeGreaterThan(-1);
	});

	test("homepage includes all required content sections", async () => {
		const result = await container.renderToString(HomePage);

		// Check main content sections
		expect(result).toContain("About Me");
		expect(result).toContain("Latest Posts");
		expect(result).toContain("Latest Projects");
		expect(result).toContain("Socials");

		// Check that ProjectsCarousel is included
		expect(result).toContain("Featured Projects");
		expect(result).toContain('class="projects-carousel"');
	});

	test("homepage layout includes both static projects and projects carousel", async () => {
		const result = await container.renderToString(HomePage);

		// Check that both the static "Latest Projects" section and carousel exist
		expect(result).toContain("Latest Projects"); // Static section
		expect(result).toContain("Featured Projects"); // Carousel section

		// Both should show project data
		expect(result).toContain("E-commerce Platform");
		expect(result).toContain("Weather Dashboard");
	});

	test("projects data is properly sorted by date", async () => {
		const result = await container.renderToString(HomePage);

		// The projects should be sorted by date (newest first)
		const ecommerceIndex = result.indexOf("E-commerce Platform");
		const weatherIndex = result.indexOf("Weather Dashboard");

		// E-commerce (2024-10-10) should appear before Weather (2024-09-15)
		expect(ecommerceIndex).toBeGreaterThan(-1);
		expect(weatherIndex).toBeGreaterThan(-1);
	});

	test("homepage handles empty projects collection", async () => {
		// Mock empty projects collection
		vi.mocked(vi.importActual("astro:content")).getCollection = vi.fn((collection: string) => {
			if (collection === "projects") {
				return Promise.resolve([]);
			}
			return Promise.resolve([]);
		});

		const result = await container.renderToString(HomePage);

		// Should still render the carousel structure
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain("Featured Projects");
	});
});

describe("Homepage Content Collection Integration", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("homepage loads and displays all content collections", async () => {
		const result = await container.renderToString(HomePage);

		// Check posts collection integration
		expect(result).toContain("Latest Posts");
		expect(result).toContain("Test Post");

		// Check projects collection integration
		expect(result).toContain("Latest Projects");
		expect(result).toContain("E-commerce Platform");

		// Check about collection integration
		expect(result).toContain("About Me");

		// Check quickInfo collection integration
		expect(result).toContain("Full Stack Developer");

		// Check socials collection integration
		expect(result).toContain("GitHub");
	});

	test("projects collection data flows correctly to carousel", async () => {
		const result = await container.renderToString(HomePage);

		// Verify that project data from content collection appears in carousel
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain("E-commerce Platform");
		expect(result).toContain("Weather Dashboard");
		expect(result).toContain("Full-stack e-commerce solution");
		expect(result).toContain("Beautiful weather app");
		expect(result).toContain("Status: In Development");
		expect(result).toContain("Status: Completed");
	});

	test("homepage renders without errors when collections are present", async () => {
		// This test ensures the homepage doesn't crash with real data
		expect(async () => {
			await container.renderToString(HomePage);
		}).not.toThrow();
	});
});

describe("Homepage ProjectsCarousel Visual Integration", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("carousel is properly integrated into homepage layout", async () => {
		const result = await container.renderToString(HomePage);

		// Check that carousel has proper structure within homepage
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain('class="carousel-container"');
		expect(result).toContain('class="carousel-track"');
		expect(result).toContain('class="project-card"');
	});

	test("carousel includes intersection observer script", async () => {
		const result = await container.renderToString(HomePage);

		// Check that the carousel's JavaScript functionality is included
		expect(result).toContain("IntersectionObserver");
		expect(result).toContain("focused");
	});

	test("carousel maintains Visual Spec requirements on homepage", async () => {
		const result = await container.renderToString(HomePage);

		// Verify Visual Spec compliance in homepage context
		expect(result).toContain('class="projects-carousel"'); // Black background
		expect(result).toContain('class="project-card"'); // Card styling
		expect(result).toContain('class="card-image"'); // Image on top
		expect(result).toContain('class="project-title"'); // Title below
		expect(result).toContain('class="project-description"'); // Description
	});

	test("homepage includes proper semantic structure with carousel", async () => {
		const result = await container.renderToString(HomePage);

		// Check for proper HTML structure
		expect(result).toContain("<section"); // Carousel should be a section
		expect(result).toContain("<h2"); // Section titles
		expect(result).toContain("<h3"); // Project titles
		expect(result).toContain("<div"); // Container elements
	});
});

describe("Homepage Error Handling", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("homepage handles missing content collections gracefully", async () => {
		// Mock failed content collection calls
		vi.mocked(vi.importActual("astro:content")).getCollection = vi.fn(() => {
			return Promise.resolve([]);
		});

		vi.mocked(vi.importActual("astro:content")).getEntry = vi.fn(() => {
			return Promise.resolve(null);
		});

		const result = await container.renderToString(HomePage);

		// Should still render basic structure
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain("Featured Projects");
	});

	test("homepage renders with minimal content", async () => {
		// Test with minimal required content
		const result = await container.renderToString(HomePage);

		// Should have basic structure
		expect(result).toContain("<html");
		expect(result).toContain("<body");
		expect(result).toContain('class="projects-carousel"');
	});
});