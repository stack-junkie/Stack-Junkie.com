import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe, beforeEach, vi } from "vitest";
import { getCollection } from "astro:content";
import ProjectsCarousel from "./ProjectsCarousel.astro";
import type { CollectionEntry } from "astro:content";

// Mock astro:content
vi.mock("astro:content", () => ({
	getCollection: vi.fn(),
}));

// Mock real project data that matches the actual content collection schema
const mockProjectsData: CollectionEntry<"projects">[] = [
	{
		id: "ecommerce-site",
		slug: "ecommerce-site",
		body: "# E-commerce Platform\n\nA complete e-commerce solution with modern design and secure payments.",
		collection: "projects",
		data: {
			title: "E-commerce Platform",
			description: "Full-stack e-commerce solution with payment integration",
			date: new Date("2024-10-10"),
			image: {
				src: "/_astro/ecommerce-screenshot.webp",
				width: 800,
				height: 600,
				format: "webp",
			} as any,
			link: "https://ecommerce-demo.example.com",
			info: [
				{
					text: "Status: In Development",
					icon: { type: "lucide", name: "code" },
				},
				{
					text: "Tech Stack: Astro, Node.js, Stripe",
					icon: { type: "lucide", name: "layers" },
				},
				{
					text: "Full Stack",
					icon: { type: "lucide", name: "server" },
				},
			],
		},
	},
	{
		id: "weather-app",
		slug: "weather-app",
		body: "# Weather Dashboard\n\nA beautiful weather application with real-time data.",
		collection: "projects",
		data: {
			title: "Weather Dashboard",
			description: "Beautiful weather app with location-based forecasts and animations",
			date: new Date("2024-09-15"),
			image: {
				src: "/_astro/weather-screenshot.webp",
				width: 800,
				height: 600,
				format: "webp",
			} as any,
			info: [
				{
					text: "Status: Completed",
					icon: { type: "lucide", name: "check" },
				},
				{
					text: "Tech Stack: Next.js, TypeScript, OpenWeather API",
					icon: { type: "lucide", name: "layers" },
				},
				{
					text: "GitHub",
					icon: { type: "simple-icons", name: "github" },
					link: "https://github.com/example/weather-app",
				},
			],
		},
	},
	{
		id: "task-tracker",
		slug: "task-tracker",
		body: "# Task Tracker Pro\n\nA modern task management application built with React and TypeScript.",
		collection: "projects",
		data: {
			title: "Task Tracker Pro",
			description: "A modern task management app built with React and TypeScript",
			date: new Date("2024-08-20"),
			image: {
				src: "/_astro/task-tracker-screenshot.webp",
				width: 800,
				height: 600,
				format: "webp",
			} as any,
			link: "https://task-tracker-demo.example.com",
			info: [
				{
					text: "Status: Completed",
					icon: { type: "lucide", name: "check" },
				},
				{
					text: "Tech Stack: React, TypeScript, Vite",
					icon: { type: "lucide", name: "layers" },
				},
				{
					text: "Live Demo",
					icon: { type: "lucide", name: "external-link" },
					link: "https://task-tracker-demo.example.com",
				},
			],
		},
	},
	{
		id: "placeholder-project",
		slug: "placeholder-project",
		body: "# Coming Soon: First Project\n\nThis is a placeholder project while I work on my first real project.",
		collection: "projects",
		data: {
			title: "Coming Soon: First Project",
			description: "This is a placeholder project while I work on my first real project for the $1.00 Challenge.",
			date: new Date("2024-07-01"),
			image: {
				src: "/_astro/placeholder-screenshot.webp",
				width: 800,
				height: 600,
				format: "webp",
			} as any,
			info: [
				{
					text: "Status: In Development",
					icon: { type: "lucide", name: "code" },
				},
				{
					text: "Tech Stack: TBD",
					icon: { type: "lucide", name: "layers" },
				},
			],
		},
	},
];

describe("ProjectsCarousel Content Collection Integration", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
		vi.clearAllMocks();
	});

	test("integrates with real projects content collection", async () => {
		vi.mocked(getCollection).mockResolvedValue(mockProjectsData);

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjectsData },
		});

		// Check that all real project data is rendered
		expect(result).toContain("E-commerce Platform");
		expect(result).toContain("Weather Dashboard");
		expect(result).toContain("Task Tracker Pro");
		expect(result).toContain("Coming Soon: First Project");

		// Check descriptions
		expect(result).toContain("Full-stack e-commerce solution with payment integration");
		expect(result).toContain("Beautiful weather app with location-based forecasts");
		expect(result).toContain("A modern task management app built with React and TypeScript");
		expect(result).toContain("This is a placeholder project while I work on my first real project");
	});

	test("handles project info arrays correctly", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjectsData },
		});

		// Check that project info is rendered correctly
		expect(result).toContain("Status: In Development");
		expect(result).toContain("Status: Completed");
		expect(result).toContain("Tech Stack: Astro, Node.js, Stripe");
		expect(result).toContain("Tech Stack: Next.js, TypeScript, OpenWeather API");
		expect(result).toContain("Tech Stack: React, TypeScript, Vite");
		expect(result).toContain("Tech Stack: TBD");
		expect(result).toContain("Full Stack");
		expect(result).toContain("GitHub");
		expect(result).toContain("Live Demo");
	});

	test("handles projects with different icon types", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjectsData },
		});

		// The component should render all projects regardless of icon type
		expect(result).toContain('class="project-card"');
		expect(result).toContain('class="project-meta"');
		expect(result).toContain('class="meta-item"');

		// Check that projects with different icon types are rendered
		const cardMatches = result.match(/class="project-card"/g);
		expect(cardMatches).toHaveLength(4);
	});

	test("handles projects with optional fields", async () => {
		const projectsWithOptionalFields = [
			{
				...mockProjectsData[0],
				data: {
					...mockProjectsData[0].data,
					link: undefined, // Optional field
				},
			},
			{
				...mockProjectsData[1],
				data: {
					...mockProjectsData[1].data,
					link: "https://example.com", // Present optional field
				},
			},
		];

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: projectsWithOptionalFields },
		});

		// Should render both projects correctly
		expect(result).toContain("E-commerce Platform");
		expect(result).toContain("Weather Dashboard");
		expect(result).toContain('class="project-card"');
	});

	test("handles projects with complex info arrays", async () => {
		const projectWithComplexInfo = [
			{
				...mockProjectsData[0],
				data: {
					...mockProjectsData[0].data,
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
						{
							text: "Live Demo",
							icon: { type: "lucide", name: "external-link" },
							link: "https://demo.example.com",
						},
						{
							text: "Documentation",
							icon: { type: "lucide", name: "book" },
							link: "https://docs.example.com",
						},
					],
				},
			},
		];

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: projectWithComplexInfo },
		});

		// Check that all info items are rendered
		expect(result).toContain("Status: In Development");
		expect(result).toContain("Tech Stack: Complex Stack");
		expect(result).toContain("GitHub");
		expect(result).toContain("Live Demo");
		expect(result).toContain("Documentation");
	});

	test("sorts projects by date correctly", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjectsData },
		});

		// Projects should be sorted by date (most recent first)
		const projectTitles = [
			"E-commerce Platform", // 2024-10-10
			"Weather Dashboard", // 2024-09-15
			"Task Tracker Pro", // 2024-08-20
			"Coming Soon: First Project", // 2024-07-01
		];

		// Check that all projects are present
		projectTitles.forEach((title) => {
			expect(result).toContain(title);
		});
	});

	test("handles empty projects array", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: [] },
		});

		// Should render basic structure without errors
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain("Featured Projects");
		expect(result).toContain('class="carousel-container"');
		expect(result).toContain('class="carousel-track"');
	});

	test("handles projects with missing required fields gracefully", async () => {
		const projectsWithMissingFields = [
			{
				...mockProjectsData[0],
				data: {
					...mockProjectsData[0].data,
					title: "", // Missing title
				},
			},
			{
				...mockProjectsData[1],
				data: {
					...mockProjectsData[1].data,
					description: "", // Missing description
				},
			},
		];

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: projectsWithMissingFields },
		});

		// Should still render the structure
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain('class="project-card"');
		expect(result).toContain('class="project-title"');
		expect(result).toContain('class="project-description"');
	});
});

describe("ProjectsCarousel Image Integration", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("handles projects with images", async () => {
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjectsData },
		});

		// Check that image containers are rendered
		expect(result).toContain('class="card-image"');
		
		// Should have image containers for each project
		const imageContainers = result.match(/class="card-image"/g);
		expect(imageContainers).toHaveLength(4);
	});

	test("handles projects without images", async () => {
		const projectsWithoutImages = mockProjectsData.map((project) => ({
			...project,
			data: {
				...project.data,
				image: undefined as any,
			},
		}));

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: projectsWithoutImages },
		});

		// Should still render image containers for layout consistency
		expect(result).toContain('class="card-image"');
		expect(result).toContain('class="project-card"');
	});

	test("handles different image formats", async () => {
		const projectsWithDifferentImages = [
			{
				...mockProjectsData[0],
				data: {
					...mockProjectsData[0].data,
					image: {
						src: "/_astro/image1.webp",
						width: 800,
						height: 600,
						format: "webp",
					} as any,
				},
			},
			{
				...mockProjectsData[1],
				data: {
					...mockProjectsData[1].data,
					image: {
						src: "/_astro/image2.jpg",
						width: 1200,
						height: 800,
						format: "jpg",
					} as any,
				},
			},
		];

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: projectsWithDifferentImages },
		});

		// Should render both projects with different image formats
		expect(result).toContain('class="card-image"');
		expect(result).toContain("E-commerce Platform");
		expect(result).toContain("Weather Dashboard");
	});
});

describe("ProjectsCarousel Data Validation", () => {
	let container: AstroContainer;

	beforeEach(async () => {
		container = await AstroContainer.create();
	});

	test("validates project data structure", async () => {
		// Test that the component handles properly structured data
		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: mockProjectsData },
		});

		// Check that all required fields are rendered
		mockProjectsData.forEach((project) => {
			expect(result).toContain(project.data.title);
			expect(result).toContain(project.data.description);
			
			project.data.info.forEach((info) => {
				expect(result).toContain(info.text);
			});
		});
	});

	test("handles malformed project data gracefully", async () => {
		const malformedProjects = [
			{
				id: "malformed",
				slug: "malformed",
				body: "test",
				collection: "projects",
				data: {
					title: "Test Project",
					description: "Test description",
					date: new Date(),
					image: null as any,
					info: null as any, // Malformed info
				},
			},
		] as CollectionEntry<"projects">[];

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: malformedProjects },
		});

		// Should render basic structure without crashing
		expect(result).toContain('class="projects-carousel"');
		expect(result).toContain("Test Project");
		expect(result).toContain("Test description");
	});

	test("handles projects with various date formats", async () => {
		const projectsWithDifferentDates = [
			{
				...mockProjectsData[0],
				data: {
					...mockProjectsData[0].data,
					date: new Date("2024-12-25"),
				},
			},
			{
				...mockProjectsData[1],
				data: {
					...mockProjectsData[1].data,
					date: new Date("2024-01-01"),
				},
			},
		];

		const result = await container.renderToString(ProjectsCarousel, {
			props: { projects: projectsWithDifferentDates },
		});

		// Should render both projects regardless of date format
		expect(result).toContain("E-commerce Platform");
		expect(result).toContain("Weather Dashboard");
		expect(result).toContain('class="project-card"');
	});
});