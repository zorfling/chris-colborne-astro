import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    path: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    status: z.string().default('PUBLISHED'),
  }),
});

export const collections = { blog };
