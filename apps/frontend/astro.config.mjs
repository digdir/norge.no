// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudflare from '@astrojs/cloudflare';

// Resolve the current directory of this file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: cloudflare(),
  vite: {
    resolve: {
      alias: import.meta.env.PROD && {
        '@packages': path.resolve(__dirname, '../../packages'),
        "react-dom/server": "react-dom/server.edge",
      },
    },
    server: {
      fs: {
        allow: [
          __dirname, // Allow the current directory
          path.resolve(__dirname, '../../'), // Allow the project root
        ],
      },
    }
  },
});
