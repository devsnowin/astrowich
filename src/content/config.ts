import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().max(200),
  }),
});

export const collections = {
  blog: blogCollection,
};
