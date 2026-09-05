// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: 本番ドメインが確定次第、正しいURLに差し替える
  site: 'https://yui-lp.example.com',
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'auto' },
});
