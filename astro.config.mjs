// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog-user.github.io',
	base: '/blog',
	integrations: [
		starlight({
			title: 'My Tech Blog',
			description: 'Personal technical blog and learning notes',
			sidebar: [
				{
					label: 'Blog',
					items: [{ autogenerate: { directory: 'blog' } }],
				},
				{
					label: 'Tags',
					link: '/tags',
				},
				{
					label: 'About',
					link: '/about',
				},
			],
			components: {
				Hero: './src/components/override/Hero.astro',
				ContentPage: './src/components/override/ContentPage.astro',
			},
		}),
	],
});
