import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chriscolborne.com',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'everforest-dark',
    },
  },
});
