import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Static output with prerender for most pages
  output: 'static',
  site: 'https://vibecoders.la',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
