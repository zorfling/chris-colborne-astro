import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      path: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      status: z.enum(['PUBLISHED', 'DRAFT']).default('PUBLISHED'),
      featuredImage: image().optional(),
      attribution: z.string().optional(),
    }),
});

export const collections = { blog };
