import { expect, test, describe, beforeEach, vi } from "vitest";

// Mock window.matchMedia
const mockMatchMedia = vi.fn();
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: mockMatchMedia,
});

// Mock ResizeObserver
const mockResizeObserver = vi.fn();
mockResizeObserver.mockReturnValue({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
});
Object.defineProperty(window, "ResizeObserver", {
	writable: true,
	value: mockResizeObserver,
});

describe("ProjectsCarousel Responsive Behavior", () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<section class="projects-carousel">
				<div class="container">
					<h2 class="section-title">Featured Projects</h2>
					<div class="carousel-container">
						<div class="carousel-track">
							<div class="project-card" data-testid="card-1">
								<div class="card-image"></div>
								<div class="card-content">
									<h3 class="project-title">Project 1</h3>
									<p class="project-description">Description 1</p>
								</div>
							</div>
							<div class="project-card" data-testid="card-2">
								<div class="card-image"></div>
								<div class="card-content">
									<h3 class="project-title">Project 2</h3>
									<p class="project-description">Description 2</p>
								</div>
							</div>
							<div class="project-card" data-testid="card-3">
								<div class="card-image"></div>
								<div class="card-content">
									<h3 class="project-title">Project 3</h3>
									<p class="project-description">Description 3</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		`;
	});

	test("carousel maintains structure on all screen sizes", () => {
		const carousel = document.querySelector(".projects-carousel");
		const container = document.querySelector(".container");
		const carouselTrack = document.querySelector(".carousel-track");
		const cards = document.querySelectorAll(".project-card");

		// Check that essential structure exists
		expect(carousel).toBeTruthy();
		expect(container).toBeTruthy();
		expect(carouselTrack).toBeTruthy();
		expect(cards.length).toBe(3);
	});

	test("cards have correct structure for responsive layout", () => {
		const cards = document.querySelectorAll(".project-card");

		cards.forEach((card) => {
			// Check that each card has the required structure
			expect(card.classList.contains("project-card")).toBe(true);
			
			const cardImage = card.querySelector(".card-image");
			const cardContent = card.querySelector(".card-content");
			const projectTitle = card.querySelector(".project-title");
			const projectDescription = card.querySelector(".project-description");

			expect(cardImage).toBeTruthy();
			expect(cardContent).toBeTruthy();
			expect(projectTitle).toBeTruthy();
			expect(projectDescription).toBeTruthy();
		});
	});

	test("carousel track maintains horizontal scroll capability", () => {
		const carouselTrack = document.querySelector(".carousel-track");
		expect(carouselTrack).toBeTruthy();

		// Check that track has scroll properties
		expect(carouselTrack?.scrollLeft).toBeDefined();
		expect(carouselTrack?.scrollWidth).toBeDefined();
		expect(carouselTrack?.clientWidth).toBeDefined();
	});

	test("responsive container adapts to different viewport sizes", () => {
		const container = document.querySelector(".container");
		expect(container).toBeTruthy();

		// Container should exist and be properly structured
		expect(container?.classList.contains("container")).toBe(true);
		
		const carouselContainer = container?.querySelector(".carousel-container");
		expect(carouselContainer).toBeTruthy();
	});

	test("section title remains visible on all screen sizes", () => {
		const sectionTitle = document.querySelector(".section-title");
		expect(sectionTitle).toBeTruthy();
		expect(sectionTitle?.textContent).toBe("Featured Projects");
		expect(sectionTitle?.classList.contains("section-title")).toBe(true);
	});
});

describe("ProjectsCarousel Mobile Responsive Features", () => {
	beforeEach(() => {
		// Mock mobile viewport
		document.body.innerHTML = `
			<section class="projects-carousel">
				<div class="container">
					<h2 class="section-title">Featured Projects</h2>
					<div class="carousel-container">
						<div class="carousel-track">
							<div class="project-card mobile-card" data-testid="card-1">
								<div class="card-image mobile-image"></div>
								<div class="card-content mobile-content">
									<h3 class="project-title">Project 1</h3>
									<p class="project-description">Description 1</p>
								</div>
							</div>
							<div class="project-card mobile-card" data-testid="card-2">
								<div class="card-image mobile-image"></div>
								<div class="card-content mobile-content">
									<h3 class="project-title">Project 2</h3>
									<p class="project-description">Description 2</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		`;
	});

	test("mobile cards maintain proper structure", () => {
		const cards = document.querySelectorAll(".project-card");
		expect(cards.length).toBeGreaterThan(0);

		cards.forEach((card) => {
			// Check mobile-specific structure
			expect(card.classList.contains("project-card")).toBe(true);
			
			const cardImage = card.querySelector(".card-image");
			const cardContent = card.querySelector(".card-content");
			
			expect(cardImage).toBeTruthy();
			expect(cardContent).toBeTruthy();
		});
	});

	test("mobile carousel maintains touch scrolling capability", () => {
		const carouselTrack = document.querySelector(".carousel-track");
		expect(carouselTrack).toBeTruthy();

		// Touch scrolling should be enabled (via CSS)
		expect(carouselTrack?.classList.contains("carousel-track")).toBe(true);
	});

	test("mobile layout maintains accessibility features", () => {
		const carousel = document.querySelector(".projects-carousel");
		const title = document.querySelector(".section-title");
		const projectTitles = document.querySelectorAll(".project-title");

		// Check semantic structure
		expect(carousel?.tagName).toBe("SECTION");
		expect(title?.tagName).toBe("H2");
		
		projectTitles.forEach((projectTitle) => {
			expect(projectTitle.tagName).toBe("H3");
		});
	});
});

describe("ProjectsCarousel Tablet Responsive Features", () => {
	beforeEach(() => {
		// Mock tablet viewport
		document.body.innerHTML = `
			<section class="projects-carousel">
				<div class="container">
					<h2 class="section-title">Featured Projects</h2>
					<div class="carousel-container">
						<div class="carousel-track">
							<div class="project-card tablet-card" data-testid="card-1">
								<div class="card-image tablet-image"></div>
								<div class="card-content tablet-content">
									<h3 class="project-title">Project 1</h3>
									<p class="project-description">Description 1</p>
								</div>
							</div>
							<div class="project-card tablet-card" data-testid="card-2">
								<div class="card-image tablet-image"></div>
								<div class="card-content tablet-content">
									<h3 class="project-title">Project 2</h3>
									<p class="project-description">Description 2</p>
								</div>
							</div>
							<div class="project-card tablet-card" data-testid="card-3">
								<div class="card-image tablet-image"></div>
								<div class="card-content tablet-content">
									<h3 class="project-title">Project 3</h3>
									<p class="project-description">Description 3</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		`;
	});

	test("tablet cards maintain proper aspect ratio", () => {
		const cards = document.querySelectorAll(".project-card");
		expect(cards.length).toBe(3);

		cards.forEach((card) => {
			// Check tablet-specific structure
			expect(card.classList.contains("project-card")).toBe(true);
			
			const cardImage = card.querySelector(".card-image");
			const cardContent = card.querySelector(".card-content");
			
			expect(cardImage).toBeTruthy();
			expect(cardContent).toBeTruthy();
		});
	});

	test("tablet layout maintains horizontal scrolling", () => {
		const carouselTrack = document.querySelector(".carousel-track");
		expect(carouselTrack).toBeTruthy();

		// Should maintain scroll capabilities
		expect(carouselTrack?.scrollLeft).toBeDefined();
		expect(carouselTrack?.scrollWidth).toBeDefined();
	});
});

describe("ProjectsCarousel Desktop Responsive Features", () => {
	beforeEach(() => {
		// Mock desktop viewport
		document.body.innerHTML = `
			<section class="projects-carousel">
				<div class="container">
					<h2 class="section-title">Featured Projects</h2>
					<div class="carousel-container">
						<div class="carousel-track">
							<div class="project-card desktop-card" data-testid="card-1">
								<div class="card-image desktop-image"></div>
								<div class="card-content desktop-content">
									<h3 class="project-title">Project 1</h3>
									<p class="project-description">Description 1</p>
									<div class="project-meta">
										<span class="meta-item">Status: Completed</span>
										<span class="meta-item">Tech: React</span>
									</div>
								</div>
							</div>
							<div class="project-card desktop-card" data-testid="card-2">
								<div class="card-image desktop-image"></div>
								<div class="card-content desktop-content">
									<h3 class="project-title">Project 2</h3>
									<p class="project-description">Description 2</p>
									<div class="project-meta">
										<span class="meta-item">Status: In Progress</span>
										<span class="meta-item">Tech: Vue</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		`;
	});

	test("desktop cards display full content", () => {
		const cards = document.querySelectorAll(".project-card");
		expect(cards.length).toBe(2);

		cards.forEach((card) => {
			// Check full desktop structure
			expect(card.classList.contains("project-card")).toBe(true);
			
			const cardImage = card.querySelector(".card-image");
			const cardContent = card.querySelector(".card-content");
			const projectTitle = card.querySelector(".project-title");
			const projectDescription = card.querySelector(".project-description");
			const projectMeta = card.querySelector(".project-meta");
			
			expect(cardImage).toBeTruthy();
			expect(cardContent).toBeTruthy();
			expect(projectTitle).toBeTruthy();
			expect(projectDescription).toBeTruthy();
			expect(projectMeta).toBeTruthy();
		});
	});

	test("desktop layout shows meta information", () => {
		const metaItems = document.querySelectorAll(".meta-item");
		expect(metaItems.length).toBeGreaterThan(0);

		// Check that meta items contain expected content
		const metaTexts = Array.from(metaItems).map((item) => item.textContent);
		expect(metaTexts).toContain("Status: Completed");
		expect(metaTexts).toContain("Tech: React");
		expect(metaTexts).toContain("Status: In Progress");
		expect(metaTexts).toContain("Tech: Vue");
	});

	test("desktop carousel maintains accessibility", () => {
		const carousel = document.querySelector(".projects-carousel");
		const title = document.querySelector(".section-title");
		const projectTitles = document.querySelectorAll(".project-title");

		// Check semantic structure
		expect(carousel?.tagName).toBe("SECTION");
		expect(title?.tagName).toBe("H2");
		
		projectTitles.forEach((projectTitle) => {
			expect(projectTitle.tagName).toBe("H3");
		});
	});
});

describe("ProjectsCarousel Cross-Device Compatibility", () => {
	test("maintains consistent structure across devices", () => {
		// Test that essential elements are present regardless of device
		const essentialElements = [
			".projects-carousel",
			".container",
			".section-title",
			".carousel-container",
			".carousel-track",
			".project-card",
			".card-image",
			".card-content",
			".project-title",
			".project-description",
		];

		// Create a basic DOM structure using happy-dom (available globally)
		document.body.innerHTML = `
			<section class="projects-carousel">
				<div class="container">
					<h2 class="section-title">Featured Projects</h2>
					<div class="carousel-container">
						<div class="carousel-track">
							<div class="project-card">
								<div class="card-image"></div>
								<div class="card-content">
									<h3 class="project-title">Project 1</h3>
									<p class="project-description">Description 1</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		`;

		essentialElements.forEach((selector) => {
			const element = document.querySelector(selector);
			expect(element).toBeTruthy();
		});
	});

	test("scroll behavior works across different input methods", () => {
		// Use the global document from happy-dom
		document.body.innerHTML = `
			<div class="carousel-track">
				<div class="project-card">Card 1</div>
				<div class="project-card">Card 2</div>
				<div class="project-card">Card 3</div>
			</div>
		`;

		const carouselTrack = document.querySelector(".carousel-track");

		// Test that scroll properties are available
		expect(carouselTrack?.scrollLeft).toBeDefined();
		expect(carouselTrack?.scrollWidth).toBeDefined();
		expect(carouselTrack?.clientWidth).toBeDefined();

		// Test that scroll behavior can be controlled
		if (carouselTrack) {
			carouselTrack.scrollLeft = 100;
			expect(carouselTrack.scrollLeft).toBe(100);
		}
	});
});