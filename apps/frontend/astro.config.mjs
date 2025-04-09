// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import path from 'path';

// Resolve the current directory of this file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@packages': path.resolve(__dirname, '../../packages'),
      },
    },
    server: {
      fs: {
        allow: [
          __dirname, // Allow the current directory
          path.resolve(__dirname, '../../'), // Allow the project root
        ],
      },
    },
  },
});
