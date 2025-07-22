# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses npm for package management. Common development commands:

- `npm run dev` or `npm start` - Start local development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally
- `npm run check` - Run all checks (Astro, ESLint, Prettier)
- `npm run check:astro` - Run Astro type checking
- `npm run check:eslint` - Run ESLint checks  
- `npm run check:prettier` - Check code formatting
- `npm run fix` - Auto-fix ESLint and Prettier issues
- `npm run fix:eslint` - Fix ESLint issues
- `npm run fix:prettier` - Fix code formatting

## Architecture

This is an **AstroWind** website built with:
- **Astro 5.0** - Static site generator with component-based architecture
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Key Structure

**Content System:**
- Blog posts stored in `src/data/post/` as Markdown/MDX files
- Content schema defined in `src/content/config.ts` using Zod
- Posts support frontmatter with publishDate, categories, tags, author, etc.

**Configuration:**
- Main site config in `src/config.yaml` - controls SEO metadata, blog settings, theme, analytics
- Navigation structure defined in `src/navigation.ts`
- Astro config in `astro.config.ts` with custom vendor integration

**Component Architecture:**
- `src/components/widgets/` - Page-level components (Hero, Features, Blog, etc.)
- `src/components/ui/` - Reusable UI components (Button, Form, etc.)  
- `src/components/blog/` - Blog-specific components
- `src/components/common/` - Common utilities (Analytics, Metadata, etc.)

**Layouts:**
- `src/layouts/Layout.astro` - Base layout
- `src/layouts/PageLayout.astro` - Standard page layout
- `src/layouts/MarkdownLayout.astro` - For Markdown content

**Utilities:**
- `src/utils/permalinks.ts` - URL generation helpers
- `src/utils/blog.ts` - Blog post processing
- `src/utils/images.ts` - Image optimization utilities

**Routing:**
- File-based routing in `src/pages/`
- Dynamic blog routes in `src/pages/[...blog]/`
- Static pages for homes, landing pages, services

### Custom Integration
Uses a custom Astro integration in `vendor/integration/` that loads and processes the YAML config file.

### Deployment
Configured for static output with support for Netlify, Vercel, and other static hosts.