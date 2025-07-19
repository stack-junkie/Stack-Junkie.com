/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.astro" {
	const Component: (props: Record<string, unknown>) => string;
	export default Component;
}
