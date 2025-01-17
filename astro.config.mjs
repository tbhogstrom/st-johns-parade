import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercelServerless from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: vercelServerless({
    analytics: true,
    includeFiles: ['**/*'],
    maxDuration: 8
  }),
});
