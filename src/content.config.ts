// src/content/content.config.ts

import { file, glob } from "astro/loaders";
import { defineCollection, z, reference } from "astro:content";

// 1) Lucide icons (typed)
import type { icons as lucideIcons } from '@iconify-json/lucide/icons.json';

// 2) Simple Icons JSON (default import) and extract `.icons`
import simpleIconsData from '@iconify-json/simple-icons/icons.json';
const simpleIcons = simpleIconsData.icons;

// DEBUG: confirm the first 20 keys include “reddit”
console.log(
  'simpleIcons keys (first 20):',
  Object.keys(simpleIcons).slice(0, 20)
);

// 3) Zod schemas for each icon set
const lucideIconSchema = z.object({
  type: z.literal("lucide"),
  name: z.custom<keyof typeof lucideIcons>(),
});

const simpleIconSchema = z.object({
  type: z.literal("simple-icons"),
  name: z.custom<keyof typeof simpleIcons>(),
});

// 4) Define your collections
const other = defineCollection({
  loader: glob({ base: "src/content/other", pattern: "**/*.{md,mdx}" }),
});

const quickInfo = defineCollection({
  loader: file("src/content/info.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    text: z.string(),
  }),
});

const socials = defineCollection({
  loader: file("src/content/socials.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    text: z.string(),
    link: z.string().url(),
  }),
});



const tags = defineCollection({
  loader: file("src/content/tags.json"),
  schema: z.object({
    id: z.string(),
  }),
});

const posts = defineCollection({
  loader: glob({ base: "src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      description: z.string(),
      tags: z.array(reference("tags")),
      draft: z.boolean().optional().default(false),
      image: image(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      image: image(),
      link: z.string().url().optional(),
      info: z.array(
        z.object({
          text: z.string(),
          icon: z.union([lucideIconSchema, simpleIconSchema]),
          link: z.string().url().optional(),
        })
      ),
    }),
});

// 5) Export all collections
export const collections = {
  other,
  quickInfo,
  socials,
  tags,
  posts,
  projects,
};
