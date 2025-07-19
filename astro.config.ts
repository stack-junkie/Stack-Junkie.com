import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import expressiveCode from "astro-expressive-code";
import spectre from "./package/src";
import { spectreDark } from "./src/ec-theme";


export default defineConfig({
  site: "https://stack-junkie.com",
  server: {
    host: true,
    port: 4321,
    watch: {
      usePolling: true,
      interval: 100
    },
    hmr: {
      overlay: true
    }
  },
  integrations: [
    expressiveCode({
      themes: [spectreDark]
    }),
    mdx(),
    sitemap(),
    spectre({
      name: "Stack-Junkie",
      themeColor: "#14b8a6",
      twitterHandle: "@Stack_Junkie",
      openGraph: {
        home: {
          title: "Stack-Junkie",
          description: "Electronics tech turned AI-assisted developer documenting the journey to make my first dollar from coding. Follow my $1.00 Challenge using modern AI tools."
        },
        blog: {
          title: "Blog",
          description: "Latest tutorials and insights from Stack Junkie."
        },
        projects: { title: "Projects" }
      },
      giscus: false
    })
  ],
  adapter: vercel(),
  vite: {
    assetsInclude: [
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.gif",
      "**/*.svg",
      "**/*.webp"
    ],
    css: {
      devSourcemap: true
    },
    server: {
      watch: {
        usePolling: true,
        interval: 100
      },
      hmr: {
        overlay: true,
        host: "localhost",
        clientPort: 4321
      }
    }
  }
});