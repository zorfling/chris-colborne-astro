import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chriscolborne.com',
  integrations: [sitemap()],
  redirects: {
    '/about-me': '/#about',
    '/about-me/': '/#about',
    '/about': '/#about',
    '/about/': '/#about',
  },
  markdown: {
    shikiConfig: {
      theme: 'everforest-dark',
    },
  },
});
