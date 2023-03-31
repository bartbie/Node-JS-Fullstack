import { defineConfig } from "astro/config";
import node from '@astrojs/node';
// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "min-light",
    },
  },
  output: 'server',
  adapter: node({
    mode: 'middleware'
  }),
});