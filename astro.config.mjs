// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://<YOUR_USERNAME>.github.io',
	base: '/<YOUR_REPO_NAME>',
	integrations: [
		starlight({
			title: 'My Tech Blog',
			description: 'Personal technical blog and learning notes',
			sidebar: [],
		}),
	],
});
