import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CW1bkYeR.mjs';
import { manifest } from './manifest_DBqE08Ie.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/blog/_post_.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/pagefind/pagefind.js.astro.mjs');
const _page5 = () => import('./pages/projects/_project_.astro.mjs');
const _page6 = () => import('./pages/projects.astro.mjs');
const _page7 = () => import('./pages/styles/giscus.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/blog/[post].astro", _page2],
    ["src/pages/blog.astro", _page3],
    ["src/pages/pagefind/pagefind.js.ts", _page4],
    ["src/pages/projects/[project].astro", _page5],
    ["src/pages/projects.astro", _page6],
    ["src/pages/styles/giscus.ts", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "c9c42eb6-82b2-419a-a4b4-12eeaab977d7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
