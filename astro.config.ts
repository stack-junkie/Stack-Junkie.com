import { loadEnv } from "vite";
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import { spectreDark } from './src/ec-theme';

const {
  PUBLIC_GISCUS_REPO,
  PUBLIC_GISCUS_REPO_ID,
  PUBLIC_GISCUS_CATEGORY,
  PUBLIC_GISCUS_CATEGORY_ID,
  PUBLIC_GISCUS_MAPPING,
  PUBLIC_GISCUS_REACTIONS,
  PUBLIC_GISCUS_EMIT_METADATA,
  PUBLIC_GISCUS_INPUT_POSITION,
  PUBLIC_GISCUS_THEME,
  PUBLIC_GISCUS_LANG
} = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
const config = defineConfig({
  site: 'https://stack-junkie.com',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'Stack-Junkie',
      twitterHandle: '@Stack_Junkie',
      openGraph: {
        home: {
          title: 'Stack-Junkie',
          description: 'Web development tutorials, tips, and tools for developers.'
        },
        blog: {
          title: 'Blog',
          description: 'Latest tutorials and insights from Stack Junkie.'
        },
        projects: {
          title: 'Projects'
        }
      },
      
    })
  ]
});

export default config;