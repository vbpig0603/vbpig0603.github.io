# Astro Starlight Technical Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal technical blog using Astro + Starlight, deployed to GitHub Pages

**Architecture:** Single Astro project with Starlight theme. Blog posts stored in Starlight's docs content collection (`src/content/docs/blog/`). Custom landing page configured via Starlight's `components` option. Tag system built with custom Astro pages that query the content collection. Custom pages (tags) use self-contained HTML layouts styled with Starlight's CSS variables for visual consistency.

**Tech Stack:** Astro 5, Starlight, GitHub Pages, GitHub Actions, Shiki

---

### Task 1: Initialize Astro Project with Starlight

**Files:**
- Create: Project scaffolding

- [ ] **Step 1: Create the Astro project with Starlight template**

```bash
cd C:\Blog
npx create-astro@latest . -- --template starlight --yes
```

- [ ] **Step 2: Verify project structure exists**

Run:
```bash
Get-ChildItem -LiteralPath "C:\Blog"
```
Expected: `astro.config.mjs`, `package.json`, `tsconfig.json`, `src/`, `public/`, `src/content/`, `src/content/docs/`

- [ ] **Step 3: Install dependencies**

```bash
cd C:\Blog
npm install
```

- [ ] **Step 4: Verify initial build works**

```bash
cd C:\Blog
npm run build
```
Expected: Build succeeds, output in `dist/` directory.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: initialize Astro + Starlight project"
```

---

### Task 2: Configure Astro for GitHub Pages Deployment

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Update astro.config.mjs with GitHub Pages settings**

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
```

Replace `<YOUR_USERNAME>` and `<YOUR_REPO_NAME>` with actual values.

- [ ] **Step 2: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: configure GitHub Pages URL and base path"
```

---

### Task 3: Set Up GitHub Actions Deploy Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create deploy.yml**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build Astro site
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Create .gitignore entries for deploy artifacts** (verify .gitignore exists and contains `dist`)

Check current `.gitignore`:
```bash
Get-Content "C:\Blog\.gitignore"
```
Expected: contains `dist` (Astro template includes it by default)

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions deploy workflow"
```

---

### Task 4: Define Blog Content Collection with Frontmatter Schema

**Files:**
- Modify: `src/content/config.ts`
- Create: `src/content/docs/blog/.gitkeep`

- [ ] **Step 1: Update content config with blog frontmatter schema**

```ts
import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const docs = defineCollection({
  schema: docsSchema({
    extend: z.object({
      tags: z.array(z.string()).optional().default([]),
      author: z.string().optional().default('Author'),
      summary: z.string().optional(),
      related: z.array(z.string()).optional().default([]),
      isBlog: z.boolean().optional().default(false),
    }),
  }),
});

export const collections = { docs };
```

This extends Starlight's docs schema with custom fields: `tags`, `author`, `summary`, `related`, and `isBlog`.

- [ ] **Step 2: Create blog directory**

```bash
New-Item -ItemType Directory -Path "C:\Blog\src\content\docs\blog" -Force
Set-Content -Path "C:\Blog\src\content\docs\blog\.gitkeep" -Value ""
```

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts src/content/docs/blog/.gitkeep
git commit -m "feat: define blog content collection schema with tags, author, summary, related"
```

---

### Task 5: Create Sample Blog Posts

**Files:**
- Create: `src/content/docs/blog/first-post.md`
- Create: `src/content/docs/blog/hello-world.md`

- [ ] **Step 1: Create first sample post**

```markdown
---
title: My First Tech Blog Post
description: A brief introduction to my new technical blog
date: 2026-05-23
tags: [general, introduction]
author: Your Name
summary: This is my first blog post introducing the blog and what I plan to write about.
related: []
isBlog: true
---

# My First Tech Blog Post

Welcome to my technical blog! This is where I'll share my learning notes, project experiences, and thoughts on software development.

## What to Expect

I'll be writing about:

- Programming languages and frameworks
- System design and architecture
- DevOps and deployment
- Personal projects and experiments

## Code Example

Here's a simple example:

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))
```

Stay tuned for more content!
```

- [ ] **Step 2: Create hello world post**

```markdown
---
title: Hello Astro + Starlight
description: Getting started with Astro and Starlight for building documentation sites
date: 2026-05-22
tags: [astro, starlight, web]
author: Your Name
summary: Exploring Astro and Starlight for building fast, content-driven websites.
related: [first-post]
isBlog: true
---

# Hello Astro + Starlight

[Astro](https://astro.build) is a modern static site generator that delivers fast websites with minimal JavaScript.

[Starlight](https://starlight.astro.build) is a documentation theme built on top of Astro.

## Why Starlight?

- Built-in search
- Code highlighting with Shiki
- Responsive design
- Sidebar navigation
- Easy to customize

## Setup

```bash
npm create astro@latest my-blog -- --template starlight
cd my-blog
npm run dev
```

That's all it takes to get started!
```

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/blog/
git commit -m "feat: add sample blog posts"
```

---

### Task 6: Create Blog Listing Component

**Files:**
- Create: `src/components/BlogCard.astro`
- Create: `src/components/LatestPosts.astro`

- [ ] **Step 1: Create BlogCard component**

```astro
---
interface Props {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  summary?: string;
  slug: string;
}

const { title, description, date, tags, summary, slug } = Astro.props;
---

<article class="blog-card">
  <h2><a href={`/blog/${slug}`}>{title}</a></h2>
  <p class="blog-meta">
    <time datetime={date.toISOString()}>{date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
  </p>
  <p class="blog-description">{summary || description}</p>
  {tags.length > 0 && (
    <div class="blog-tags">
      {tags.map(tag => (
        <a href={`/tags/${tag}`} class="tag-badge">{tag}</a>
      ))}
    </div>
  )}
</article>

<style>
  .blog-card {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--sl-color-gray-5);
  }
  .blog-card h2 {
    margin-bottom: 0.25rem;
  }
  .blog-card h2 a {
    color: var(--sl-color-white);
    text-decoration: none;
  }
  .blog-card h2 a:hover {
    color: var(--sl-color-accent);
  }
  .blog-meta {
    font-size: 0.875rem;
    color: var(--sl-color-gray-3);
    margin-bottom: 0.75rem;
  }
  .blog-description {
    color: var(--sl-color-gray-2);
    margin-bottom: 0.75rem;
  }
  .blog-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .tag-badge {
    font-size: 0.8rem;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    background: var(--sl-color-accent-low);
    color: var(--sl-color-accent);
    text-decoration: none;
  }
  .tag-badge:hover {
    background: var(--sl-color-accent);
    color: var(--sl-color-white);
  }
</style>
```

- [ ] **Step 2: Create LatestPosts component**

```astro
---
import { getCollection } from 'astro:content';
import BlogCard from './BlogCard.astro';

const allDocs = await getCollection('docs');
const blogPosts = allDocs
  .filter(entry => entry.data.isBlog)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---

<section class="latest-posts">
  <h2>Latest Posts</h2>
  {blogPosts.length > 0 ? (
    blogPosts.map(post => (
      <BlogCard
        title={post.data.title}
        description={post.data.description}
        date={post.data.date}
        tags={post.data.tags}
        summary={post.data.summary}
        slug={post.slug.replace('blog/', '')}
      />
    ))
  ) : (
    <p>No blog posts yet. Check back soon!</p>
  )}
</section>

<style>
  .latest-posts h2 {
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/
git commit -m "feat: create BlogCard and LatestPosts components"
```

---

### Task 7: Create Landing Page with Personal Intro

**Files:**
- Modify: `astro.config.mjs`
- Create: `src/content/docs/index.mdx`

- [ ] **Step 1: Update astro.config.mjs to disable default landing page and configure sidebar**

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://<YOUR_USERNAME>.github.io',
  base: '/<YOUR_REPO_NAME>',
  integrations: [
    starlight({
      title: 'My Tech Blog',
      description: 'Personal technical blog and learning notes',
      sidebar: [
        {
          label: 'Blog',
          autogenerate: { directory: 'blog' },
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
      },
    }),
  ],
});
```

- [ ] **Step 2: Create custom Hero component for the landing page**

```astro
---
import LatestPosts from '../LatestPosts.astro';
---

<div class="hero-section">
  <div class="hero-content">
    <h1>My Tech Blog</h1>
    <p class="hero-subtitle">
      Personal technical blog and learning notes. Sharing knowledge about
      software development, system design, and technology.
    </p>
  </div>
  <LatestPosts />
</div>

<style>
  .hero-section {
    padding: 2rem 0;
  }
  .hero-content {
    text-align: center;
    margin-bottom: 3rem;
  }
  .hero-content h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  .hero-subtitle {
    font-size: 1.125rem;
    color: var(--sl-color-gray-2);
    max-width: 600px;
    margin: 0 auto;
  }
</style>
```

- [ ] **Step 3: Create hero override component directory and file**

```bash
New-Item -ItemType Directory -Path "C:\Blog\src\components\override" -Force
```

Write `src/components/override/Hero.astro` with content from Step 2.

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs src/components/override/
git commit -m "feat: create landing page with hero intro and latest posts"
```

---

### Task 8: Create Tags System

**Files:**
- Create: `src/pages/tags/index.astro`
- Create: `src/pages/tags/[...tag].astro`
- Create: `src/components/TagList.astro`

- [ ] **Step 1: Create TagList component**

```astro
---
import { getCollection } from 'astro:content';

const allDocs = await getCollection('docs');
const blogPosts = allDocs.filter(entry => entry.data.isBlog);

const tagCounts = new Map<string, number>();
for (const post of blogPosts) {
  for (const tag of post.data.tags) {
    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
  }
}
const sortedTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]);
---

<section class="tag-list">
  <h2>All Tags</h2>
  {sortedTags.length > 0 ? (
    <div class="tags-cloud">
      {sortedTags.map(([tag, count]) => (
        <a href={`/tags/${tag}`} class="tag-item">
          {tag} <span class="tag-count">({count})</span>
        </a>
      ))}
    </div>
  ) : (
    <p>No tags found.</p>
  )}
</section>

<style>
  .tag-list h2 {
    margin-bottom: 1.5rem;
  }
  .tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .tag-item {
    padding: 0.4rem 1rem;
    border-radius: 999px;
    background: var(--sl-color-accent-low);
    color: var(--sl-color-accent);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.2s;
  }
  .tag-item:hover {
    background: var(--sl-color-accent);
    color: var(--sl-color-white);
  }
  .tag-count {
    opacity: 0.7;
  }
</style>
```

- [ ] **Step 2: Create tags index page**

```astro
---
import type { InferGetStaticPropsType } from 'astro';
import TagList from '../../components/TagList.astro';
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tags | My Tech Blog</title>
    <link rel="stylesheet" href="/_astro/style.css" />
  </head>
  <body class="sl-container">
    <main class="main-pane">
      <TagList />
    </main>
  </body>
</html>

<style>
  .main-pane {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
</style>
```

Note: The `<link>` to `/_astro/style.css` is a placeholder. During execution, verify the correct Starlight CSS path from the built output and adjust accordingly. Alternatively, remove the link and let the page use minimal styling via CSS variables.

- [ ] **Step 3: Create dynamic tag page**

```astro
---
import { getCollection } from 'astro:content';
import BlogCard from '../../components/BlogCard.astro';

export async function getStaticPaths() {
  const allDocs = await getCollection('docs');
  const blogPosts = allDocs.filter(entry => entry.data.isBlog);
  const tags = new Set<string>();
  for (const post of blogPosts) {
    for (const tag of post.data.tags) {
      tags.add(tag);
    }
  }
  return [...tags].map(tag => ({
    params: { tag },
    props: { tag },
  }));
}

const { tag } = Astro.props;

const allDocs = await getCollection('docs');
const filteredPosts = allDocs
  .filter(entry => entry.data.isBlog && entry.data.tags.includes(tag))
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Posts tagged &quot;{tag}&quot; | My Tech Blog</title>
    <link rel="stylesheet" href="/_astro/style.css" />
  </head>
  <body class="sl-container">
    <main class="main-pane">
      <h1>Posts tagged: <em>{tag}</em></h1>
      <a href="/tags" class="back-link">&larr; All tags</a>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <BlogCard
            title={post.data.title}
            description={post.data.description}
            date={post.data.date}
            tags={post.data.tags}
            summary={post.data.summary}
            slug={post.slug.replace('blog/', '')}
          />
        ))
      ) : (
        <p>No posts found with this tag.</p>
      )}
    </main>
  </body>
</html>

<style>
  .main-pane {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--sl-color-accent);
    text-decoration: none;
  }
  .back-link:hover {
    text-decoration: underline;
  }
</style>
```

- [ ] **Step 4: Update astro.config.mjs to add tags pages to sidebar**

Reconfigure the sidebar in `astro.config.mjs` to include the Tags page:

```js
sidebar: [
  {
    label: 'Blog',
    autogenerate: { directory: 'blog' },
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
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/tags/ src/components/TagList.astro
git commit -m "feat: create tags system with overview and filtered pages"
```

---

### Task 9: Create About Page

**Files:**
- Create: `src/content/docs/about.md`

- [ ] **Step 1: Create about page**

```markdown
---
title: About
description: About me and this blog
---

# About Me

I'm a software developer passionate about building great software. This blog is where I share my learning journey, project experiences, and technical insights.

## About This Blog

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), deployed on GitHub Pages.

## Contact

- GitHub: [your-username](https://github.com/your-username)
- Email: your-email@example.com
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/about.md
git commit -m "feat: create about page"
```

---

### Task 10: Create Related Articles Component

**Files:**
- Create: `src/components/RelatedArticles.astro`

- [ ] **Step 1: Create RelatedArticles component**

```astro
---
import { getCollection, getEntryBySlug } from 'astro:content';

interface Props {
  related: string[];
}

const { related } = Astro.props;

const relatedPosts = (
  await Promise.all(
    related.map(slug => getEntryBySlug('docs', `blog/${slug}`))
  )
).filter(Boolean);
---

{relatedPosts.length > 0 && (
  <aside class="related-articles">
    <h3>Related Articles</h3>
    <ul>
      {relatedPosts.map(post => (
        <li>
          <a href={`/blog/${post.slug.replace('blog/', '')}`}>
            {post.data.title}
          </a>
          <p class="related-summary">{post.data.summary || post.data.description}</p>
        </li>
      ))}
    </ul>
  </aside>
)}

<style>
  .related-articles {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--sl-color-gray-5);
  }
  .related-articles h3 {
    margin-bottom: 1rem;
  }
  .related-articles ul {
    list-style: none;
    padding: 0;
  }
  .related-articles li {
    margin-bottom: 1rem;
  }
  .related-articles a {
    color: var(--sl-color-accent);
    text-decoration: none;
    font-weight: 500;
  }
  .related-articles a:hover {
    text-decoration: underline;
  }
  .related-summary {
    font-size: 0.875rem;
    color: var(--sl-color-gray-3);
    margin-top: 0.25rem;
  }
</style>
```

- [ ] **Step 2: Update blog posts to use RelatedArticles**

We need a way to inject the component into blog posts. Create an Astro layout override for blog post pages.

Option A: Use Starlight's `components` option to override `ContentPage` and inject related articles.
Option B: Create a custom page template.

For simplicity, we'll add the component to the blog posts by customizing Starlight's page template via `overrides` in `astro.config.mjs`:

Update `astro.config.mjs`:

```js
starlight({
  // ... other config
  components: {
    Hero: './src/components/override/Hero.astro',
    ContentPage: './src/components/override/ContentPage.astro',
  },
}),
```

Create `src/components/override/ContentPage.astro`:

```astro
---
import Default from '@astrojs/starlight/components/ContentPage.astro';
import RelatedArticles from '../RelatedArticles.astro';
const { entry } = Astro.props;
---

<Default {...Astro.props} />
{entry.data.isBlog && entry.data.related?.length > 0 && (
  <RelatedArticles related={entry.data.related} />
)}
```

- [ ] **Step 3: Create ContentPage override**

```bash
New-Item -ItemType File -Path "C:\Blog\src\components\override\ContentPage.astro" -Force
```

Write content from Step 2.

- [ ] **Step 4: Commit**

```bash
git add src/components/RelatedArticles.astro src/components/override/ContentPage.astro astro.config.mjs
git commit -m "feat: add related articles component to blog posts"
```

---

### Task 11: Configure Starlight Search and Finalize Navigation

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Verify Starlight search is enabled by default**

Starlight includes built-in search via Pagefind. No additional configuration needed. Verify by checking that `search` is not disabled in config.

- [ ] **Step 2: Finalize astro.config.mjs**

Ensure `astro.config.mjs` has all settings integrated:

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://<YOUR_USERNAME>.github.io',
  base: '/<YOUR_REPO_NAME>',
  integrations: [
    starlight({
      title: 'My Tech Blog',
      description: 'Personal technical blog and learning notes',
      sidebar: [
        {
          label: 'Blog',
          autogenerate: { directory: 'blog' },
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
```

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: finalize Starlight configuration with navigation and search"
```

---

### Task 12: Verify Full Build and Test

**Files:** None (verification only)

- [ ] **Step 1: Run full build**

```bash
cd C:\Blog
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 2: Verify build output**

```bash
Get-ChildItem -LiteralPath "C:\Blog\dist" -Recurse -File | Select-Object -First 20
```
Expected: `dist/` contains generated HTML files including `index.html`, `tags/index.html`, tags pages, blog posts, etc.

- [ ] **Step 3: Check for any TypeScript errors**

```bash
cd C:\Blog
npx astro check
```
Expected: No errors (or minimal warnings).

- [ ] **Step 4: Run dev server to verify (optional manual step)**

```bash
cd C:\Blog
npm run dev
```
Open http://localhost:4321 in browser to verify the site renders correctly.

---

### Task 13: Add .gitkeep and Clean Up

**Files:** (housekeeping)

- [ ] **Step 1: Ensure no empty directories are left out of git**

```bash
git status
```
Add any missing `.gitkeep` files if needed.

- [ ] **Step 2: Final commit**

```bash
git add .
git commit -m "chore: cleanup and finalize project structure"
```

---

## Self-Review Checklist

### Spec Coverage
- [x] **首頁：個人簡介** → Task 7 (Custom Hero component with intro text)
- [x] **首頁：最新文章列表** → Task 6-7 (LatestPosts component in Hero)
- [x] **文章頁面：標題、日期、作者** → Starlight built-in (frontmatter fields)
- [x] **文章頁面：標籤** → Task 4 (frontmatter tags), displayed via Starlight
- [x] **文章頁面：程式碼區塊** → Starlight Shiki (built-in)
- [x] **文章頁面：相關文章區塊** → Task 10 (RelatedArticles component)
- [x] **標籤頁：列出所有標籤** → Task 8 (TagList component)
- [x] **標籤頁：依標籤篩選文章** → Task 8 ([...tag].astro dynamic route)
- [x] **搜尋** → Starlight built-in search
- [x] **導航：側邊欄** → Task 7/11 (Starlight sidebar config)
- [x] **GitHub Pages 部署** → Task 3 (GitHub Actions workflow)
- [x] **Content Collections blog schema** → Task 4 (config.ts with extended schema)
