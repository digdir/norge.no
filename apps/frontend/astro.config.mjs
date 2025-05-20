// @ts-check
import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import {fileURLToPath} from 'url';
import path from 'path';
import cloudflare from '@astrojs/cloudflare';

// Resolve the current directory of this file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  vite: {
    resolve: {
      alias: {
        '@packages': path.resolve(__dirname, '../../packages'),
        ...(import.meta.env.PROD
          ? {'react-dom/server': 'react-dom/server.edge'}
          : {}),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@components': path.resolve(__dirname, './src/components'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@api': path.resolve(__dirname, './src/pages/api'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@stores': path.resolve(__dirname, './src/stores'),
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
    ssr: {
      external: ['node:buffer'],
    },
  },
});
