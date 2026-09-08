import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

// Коллекция для статей
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      order: z.number().optional(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

// Коллекция для новостей — ДОБАВЛЯЕМ ПОЛЕ image
const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      image: image().optional(), // <-- ДОБАВЛЕНО
    }),
})

export const collections = { blog, news }
