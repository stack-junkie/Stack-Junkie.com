import "@testing-library/jest-dom";

// Mock browser APIs not available in Node/happy-dom
(global as any).FontFace = class FontFace {
	constructor() {}
	async load() {
		return this;
	}
};

// Mock document.fonts
if (typeof document !== "undefined") {
	Object.defineProperty(document, "fonts", {
		value: {
			add: () => {},
		},
		writable: true,
	});
}

// Mock canvas getContext for Background component
(HTMLCanvasElement.prototype.getContext as any) = () => ({
	fillRect: () => {},
	clearRect: () => {},
	getImageData: () => ({ data: new Uint8ClampedArray(4) }),
	putImageData: () => {},
	createImageData: () => ({ data: new Uint8ClampedArray(4) }),
	setTransform: () => {},
	drawImage: () => {},
	save: () => {},
	fillText: () => {},
	restore: () => {},
	beginPath: () => {},
	moveTo: () => {},
	lineTo: () => {},
	closePath: () => {},
	stroke: () => {},
	translate: () => {},
	scale: () => {},
	rotate: () => {},
	arc: () => {},
	fill: () => {},
	measureText: () => ({
		width: 0,
		actualBoundingBoxAscent: 0,
		actualBoundingBoxDescent: 0,
		actualBoundingBoxLeft: 0,
		actualBoundingBoxRight: 0,
		alphabeticBaseline: 0,
		emHeightAscent: 0,
		emHeightDescent: 0,
		fontBoundingBoxAscent: 0,
		fontBoundingBoxDescent: 0,
		hangingBaseline: 0,
		ideographicBaseline: 0,
	}),
	transform: () => {},
	rect: () => {},
	clip: () => {},
});
