// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

import { kernelSnippet } from './src/plugins/kernel-snippet.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://osrtos.com',
  vite: {
    plugins: [tailwindcss()]
  },

  trailingSlash: 'always',
  integrations: [sitemap()],

  markdown: {
    processor: satteri({ mdastPlugins: [kernelSnippet] })
  }
});
