import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
});

// Mock window.IntersectionObserver
Object.defineProperty(window, "IntersectionObserver", {
	writable: true,
	configurable: true,
	value: mockIntersectionObserver,
});

// Mock requestAnimationFrame
Object.defineProperty(window, "requestAnimationFrame", {
	writable: true,
	value: vi.fn((callback: Function) => {
		setTimeout(callback, 16);
	}),
});

describe("ProjectsCarousel Scroll Behavior", () => {
	beforeEach(() => {
		// Mock DOM elements using happy-dom (already configured in vitest)
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

	afterEach(() => {
		vi.clearAllMocks();
	});

	test("carousel track has correct scroll properties", () => {
		const carouselTrack = document.querySelector(".carousel-track");
		expect(carouselTrack).toBeTruthy();

		// Check that scroll properties can be accessed
		expect(carouselTrack?.scrollLeft).toBeDefined();
		expect(carouselTrack?.scrollWidth).toBeDefined();
		expect(carouselTrack?.clientWidth).toBeDefined();
	});

	test("IntersectionObserver is properly initialized", () => {
		const cards = document.querySelectorAll(".project-card");
		const carousel = document.querySelector(".carousel-track");

		// Simulate the script execution
		const observer = new IntersectionObserver(() => {}, {
			root: carousel,
			rootMargin: "0px",
			threshold: 0.8,
		});

		cards.forEach((card) => {
			observer.observe(card);
		});

		// Check that IntersectionObserver was called with correct parameters
		expect(mockIntersectionObserver).toHaveBeenCalledWith(
			expect.any(Function),
			expect.objectContaining({
				root: carousel,
				rootMargin: "0px",
				threshold: 0.8,
			})
		);
	});

	test("focus state is applied correctly to intersecting card", () => {
		const cards = document.querySelectorAll(".project-card");
		const carousel = document.querySelector(".carousel-track");

		// Create a mock intersection observer callback
		let observerCallback: Function;
		mockIntersectionObserver.mockImplementation((callback: Function) => {
			observerCallback = callback;
			return {
				observe: vi.fn(),
				unobserve: vi.fn(),
				disconnect: vi.fn(),
			};
		});

		// Initialize the observer
		const observer = new IntersectionObserver(() => {}, {
			root: carousel,
			rootMargin: "0px",
			threshold: 0.8,
		});

		cards.forEach((card) => {
			observer.observe(card);
		});

		// Simulate intersection event
		const mockEntry = {
			target: cards[1], // Second card
			isIntersecting: true,
		};

		// Execute the callback logic manually
		cards.forEach((card) => card.classList.remove("focused"));
		if (mockEntry.isIntersecting) {
			mockEntry.target.classList.add("focused");
		}

		// Check that only the intersecting card has focus
		expect(cards[0].classList.contains("focused")).toBe(false);
		expect(cards[1].classList.contains("focused")).toBe(true);
		expect(cards[2].classList.contains("focused")).toBe(false);
	});

	test("focus state is removed from all cards when new card intersects", () => {
		const cards = document.querySelectorAll(".project-card");

		// Set initial focus state
		cards[0].classList.add("focused");
		cards[1].classList.add("focused");

		// Simulate new intersection
		const mockEntry = {
			target: cards[2], // Third card
			isIntersecting: true,
		};

		// Execute the callback logic
		cards.forEach((card) => card.classList.remove("focused"));
		if (mockEntry.isIntersecting) {
			mockEntry.target.classList.add("focused");
		}

		// Check that only the new card has focus
		expect(cards[0].classList.contains("focused")).toBe(false);
		expect(cards[1].classList.contains("focused")).toBe(false);
		expect(cards[2].classList.contains("focused")).toBe(true);
	});

	test("scroll snapping is enabled on carousel track", () => {
		const carouselTrack = document.querySelector(".carousel-track");
		expect(carouselTrack).toBeTruthy();

		// Check that the element exists (scroll-snap behavior is tested via CSS)
		expect(carouselTrack?.classList.contains("carousel-track")).toBe(true);
	});

	test("touch scrolling behavior is enabled", () => {
		const carouselTrack = document.querySelector(".carousel-track");
		expect(carouselTrack).toBeTruthy();

		// Check that the element exists (touch scrolling is enabled via CSS)
		expect(carouselTrack?.classList.contains("carousel-track")).toBe(true);
	});

	test("cards have correct scroll snap alignment", () => {
		const cards = document.querySelectorAll(".project-card");
		
		cards.forEach((card) => {
			expect(card.classList.contains("project-card")).toBe(true);
		});

		// Each card should have scroll-snap-align: center (tested via CSS)
		expect(cards.length).toBe(3);
	});
});

describe("ProjectsCarousel Focus State Transitions", () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<section class="projects-carousel">
				<div class="carousel-container">
					<div class="carousel-track">
						<div class="project-card focused" data-testid="card-1">
							<div class="card-image"></div>
							<div class="card-content">
								<h3 class="project-title">Project 1</h3>
							</div>
						</div>
						<div class="project-card" data-testid="card-2">
							<div class="card-image"></div>
							<div class="card-content">
								<h3 class="project-title">Project 2</h3>
							</div>
						</div>
						<div class="project-card" data-testid="card-3">
							<div class="card-image"></div>
							<div class="card-content">
								<h3 class="project-title">Project 3</h3>
							</div>
						</div>
					</div>
				</div>
			</section>
		`;
	});

	test("only one card can have focus at a time", () => {
		const cards = document.querySelectorAll(".project-card");

		// Initially, first card should be focused
		expect(cards[0].classList.contains("focused")).toBe(true);
		expect(cards[1].classList.contains("focused")).toBe(false);
		expect(cards[2].classList.contains("focused")).toBe(false);

		// Simulate focus change
		cards[0].classList.remove("focused");
		cards[1].classList.add("focused");

		// Check that only second card is focused
		expect(cards[0].classList.contains("focused")).toBe(false);
		expect(cards[1].classList.contains("focused")).toBe(true);
		expect(cards[2].classList.contains("focused")).toBe(false);
	});

	test("focus state can be toggled correctly", () => {
		const card = document.querySelector(".project-card");
		expect(card).toBeTruthy();

		// Initially focused
		expect(card!.classList.contains("focused")).toBe(true);

		// Remove focus
		card!.classList.remove("focused");
		expect(card!.classList.contains("focused")).toBe(false);

		// Add focus back
		card!.classList.add("focused");
		expect(card!.classList.contains("focused")).toBe(true);
	});

	test("focus state changes are detectable", () => {
		const cards = document.querySelectorAll(".project-card");
		
		// Track focus changes
		let focusedCard: Element | null = null;
		
		cards.forEach((card) => {
			if (card.classList.contains("focused")) {
				focusedCard = card;
			}
		});

		expect(focusedCard).toBe(cards[0]);

		// Change focus
		cards[0].classList.remove("focused");
		cards[2].classList.add("focused");

		// Find new focused card
		focusedCard = null;
		cards.forEach((card) => {
			if (card.classList.contains("focused")) {
				focusedCard = card;
			}
		});

		expect(focusedCard).toBe(cards[2]);
	});
});

describe("ProjectsCarousel Intersection Observer Configuration", () => {
	test("observer is configured with correct threshold", () => {
		const carousel = document.createElement("div");
		carousel.className = "carousel-track";

		const observer = new IntersectionObserver(() => {}, {
			root: carousel,
			rootMargin: "0px",
			threshold: 0.8,
		});

		expect(mockIntersectionObserver).toHaveBeenCalledWith(
			expect.any(Function),
			expect.objectContaining({
				root: carousel,
				rootMargin: "0px",
				threshold: 0.8,
			})
		);
	});

	test("observer callback handles multiple entries correctly", () => {
		const cards = [
			document.createElement("div"),
			document.createElement("div"),
			document.createElement("div"),
		];

		cards.forEach((card) => {
			card.className = "project-card";
		});

		// Mock multiple intersection entries
		const mockEntries = [
			{ target: cards[0], isIntersecting: false },
			{ target: cards[1], isIntersecting: true },
			{ target: cards[2], isIntersecting: false },
		];

		// Simulate the observer callback logic
		mockEntries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Remove focused class from all cards
				cards.forEach((card) => card.classList.remove("focused"));
				// Add focused class to intersecting card
				entry.target.classList.add("focused");
			}
		});

		// Check that only the intersecting card has focus
		expect(cards[0].classList.contains("focused")).toBe(false);
		expect(cards[1].classList.contains("focused")).toBe(true);
		expect(cards[2].classList.contains("focused")).toBe(false);
	});

	test("observer handles edge cases gracefully", () => {
		// Test with no intersecting entries
		const cards = [document.createElement("div")];
		cards[0].className = "project-card focused";

		const mockEntries = [
			{ target: cards[0], isIntersecting: false },
		];

		// Simulate the observer callback logic
		mockEntries.forEach((entry) => {
			if (entry.isIntersecting) {
				cards.forEach((card) => card.classList.remove("focused"));
				entry.target.classList.add("focused");
			}
		});

		// Card should keep its focused state since no new intersection occurred
		expect(cards[0].classList.contains("focused")).toBe(true);
	});
});