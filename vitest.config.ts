/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		environment: "happy-dom",
		setupFiles: ["./src/test/setup.ts"],
		globals: true,
		coverage: {
			reporter: ["text", "json", "html"],
			threshold: {
				global: {
					branches: 80,
					functions: 80,
					lines: 80,
					statements: 80,
				},
			},
		},
	},
});
