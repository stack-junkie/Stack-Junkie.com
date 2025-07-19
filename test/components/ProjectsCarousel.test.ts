import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe, beforeEach, vi } from "vitest";
import ProjectsCarousel from "./ProjectsCarousel.astro";
import type { CollectionEntry } from "astro:content";

// Mock projects data that matches the content collection schema
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
			image: {} as any, // Mock image
			info: [
				{
					text: "Status: In Development",
					icon: { type: "lucide", name: "code" },
				},
				{
					text: "Tech Stack: Astro, Node.js, Stripe",
					icon: { type: "lucide", name: "layers" },
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
			image: {} as any, // Mock image
			info: [
				{
					text: "Status: Completed",
					icon: { type: "lucide", name: "check" },
				},
				{
					text: "Tech Stack: Next.js, TypeScript",
					icon: { type: "lucide", name: "layers" },
				},
			],
		},
	},
	{
		id: "task-tracker",
		slug: "task-tracker",
		body: "Task tracker content",
		collection: "projects",
		data: {
			title: "Task Tracker Pro",
			description: "Modern task management app with TypeScript",
			date: new Date("2024-08-20"),
			image: {} as any, // Mock image
			info: [
				{
					text: "Status: Completed",
					icon: { type: "lucide", name: "check" },
				},
				{
					text: "Tech Stack: React, TypeScript",
					icon: { type: "lucide", name: "layers" },
				},
			],
		},
	},
];

describe("ProjectsCarousel Visual Spec Compliance", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("renders with correct base structure and classes", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects },
		});

		// Check main wrapper structure
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain('class="container"');
		expect(result).toContain('class="section-title"');
		expect(result).toContain('class="carousel-container"');
		expect(result).toContain('class="carousel-track"');
		expect(result).toContain("Featured Projects");
	});

	test("renders all project cards with correct structure", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects },
		});

		// Check that all projects are rendered
		expect(result).toContain("E-commerce Platform");
		expect(result).toContain("Weather Dashboard");
		expect(result).toContain("Task Tracker Pro");

		// Check card structure
		const cardMatches = result.match(/class="project-card"/g);
		expect(cardMatches).toHaveLength(3);

		// Check card content structure
		expect(result).toContain('class="card-image"');
		expect(result).toContain('class="card-content"');
		expect(result).toContain('class="project-title"');
		expect(result).toContain('class="project-description"');
		expect(result).toContain('class="project-meta"');
	});

	test("applies Visual Spec styling requirements", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects },
		});

		// Check for required CSS classes that implement Visual Spec
		expect(result).toContain('class="projects-carousel"'); // Black background container
		expect(result).toContain('class="carousel-track"'); // Horizontal scrolling
		expect(result).toContain('class="project-card"'); // Card styling
		expect(result).toContain('class="card-image"'); // Image area
		expect(result).toContain('class="project-title"'); // Title styling
	});

	test("handles empty projects array gracefully", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: [] },
		});

		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain("Featured Projects");
		// Should still render the container structure
		expect(result).toContain('class="carousel-container"');
		expect(result).toContain('class="carousel-track"');
	});

	test("handles projects without images", async () => {
		const projectsWithoutImages = mockProjects.map((project) => ({
			...project,
			data: {
				...project.data,
				image: undefined as any,
			},
		}));

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: projectsWithoutImages },
		});

		expect(result).toContain('class="project-card"');
		expect(result).toContain('class="card-image"');
		// Should still render image container for layout consistency
	});

	test("renders project info and meta data correctly", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects },
		});

		// Check that project info is rendered
		expect(result).toContain("Status: In Development");
		expect(result).toContain("Status: Completed");
		expect(result).toContain("Tech Stack: Astro, Node.js, Stripe");
		expect(result).toContain("Tech Stack: Next.js, TypeScript");
		expect(result).toContain("Tech Stack: React, TypeScript");

		// Check that meta container is present
		expect(result).toContain('class="project-meta"');
		expect(result).toContain('class="meta-item"');
	});

	test("applies custom className when provided", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects, class: "custom-carousel" },
		});

		expect(result).toContain('class="projects-carousel custom-carousel"');
	});
});

describe("ProjectsCarousel Responsive Design", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("includes responsive CSS classes and structure", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects },
		});

		// Check that responsive containers are present
		expect(result).toContain('class="carousel-container"');
		expect(result).toContain('class="carousel-track"');
		expect(result).toContain('class="project-card"');

		// The actual responsive behavior is tested in the CSS, but we can check
		// that the necessary structure is in place
		expect(result).toContain('class="card-image"');
		expect(result).toContain('class="card-content"');
	});
});

describe("ProjectsCarousel Content Integration", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("correctly handles real project data structure", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects },
		});

		// Verify that all project data is correctly rendered
		mockProjects.forEach((project) => {
			expect(result).toContain(project.data.title);
			expect(result).toContain(project.data.description);
			
			// Check that project info is rendered
			project.data.info.forEach((info) => {
				expect(result).toContain(info.text);
			});
		});
	});

	test("handles projects with optional links", async () => {
		const projectsWithLinks = mockProjects.map((project) => ({
			...project,
			data: {
				...project.data,
				link: "https://example.com",
			},
		}));

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: projectsWithLinks },
		});

		// Should still render correctly with optional link data
		expect(result).toContain('class="project-card"');
		expect(result).toContain(projectsWithLinks[0].data.title);
	});

	test("handles complex project info arrays", async () => {
		const projectWithComplexInfo = [
			{
				...mockProjects[0],
				data: {
					...mockProjects[0].data,
					info: [
						{
							text: "Status: In Development",
							icon: { type: "lucide", name: "code" },
						},
						{
							text: "Tech Stack: Complex Stack",
							icon: { type: "lucide", name: "layers" },
						},
						{
							text: "GitHub",
							icon: { type: "simple-icons", name: "github" },
							link: "https://github.com/example/repo",
						},
					],
				},
			},
		];

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: projectWithComplexInfo },
		});

		expect(result).toContain("Status: In Development");
		expect(result).toContain("Tech Stack: Complex Stack");
		expect(result).toContain("GitHub");
	});
});

describe("ProjectsCarousel Visual Spec Requirements", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("includes required CSS for Visual Spec compliance", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects },
		});

		// Check that Visual Spec requirements are implemented via CSS classes
		expect(result).toContain('class="projects-carousel"'); // Black background (#000)
		expect(result).toContain('class="carousel-track"'); // Horizontal scrolling with scroll-snap
		expect(result).toContain('class="project-card"'); // 300px x 400px cards with rounded corners
		expect(result).toContain('class="card-image"'); // Image area on top
		expect(result).toContain('class="project-title"'); // Title below image
		expect(result).toContain('class="project-description"'); // Description text
		expect(result).toContain('class="project-meta"'); // Meta information
	});

	test("includes script for intersection observer functionality", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects },
		});

		// Check that the script tag for intersection observer is present
		expect(result).toContain("<script>");
		expect(result).toContain("IntersectionObserver");
		expect(result).toContain("focused");
	});

	test("includes proper accessibility attributes", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjects },
		});

		// Check for proper semantic HTML structure
		expect(result).toContain("<section"); // Semantic section element
		expect(result).toContain("<h2"); // Proper heading hierarchy
		expect(result).toContain("<h3"); // Project title headings
		expect(result).toContain("<p"); // Description paragraphs
	});
});

describe("ProjectsCarousel Error Handling", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("handles malformed project data gracefully", async () => {
		const malformedProjects = [
			{
				id: "test",
				slug: "test",
				body: "test",
				collection: "projects",
				data: {
					title: "Test Project",
					description: "Test description",
					date: new Date(),
					image: {} as any,
					info: [], // Empty info array
				},
			},
		] as CollectionEntry<"projects">[];

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: malformedProjects },
		});

		expect(result).toContain("Test Project");
		expect(result).toContain("Test description");
		expect(result).toContain('class="project-card"');
	});

	test("handles undefined props gracefully", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: undefined as any },
		});

		// Should not crash and should render basic structure
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain("Featured Projects");
	});
});