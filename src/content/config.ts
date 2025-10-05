import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160).optional(),
    date: z.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    keywords: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};