import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'zod';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				tags: z.array(z.string()).optional().default([]),
				author: z.string().optional().default('Author'),
				summary: z.string().optional(),
				related: z.array(z.string()).optional().default([]),
				isBlog: z.boolean().optional().default(false),
			}),
		}),
	}),
};
