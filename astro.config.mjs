import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',  // Change from 'hybrid' to 'server'
  adapter: vercel({
    analytics: true,
    webAnalytics: true,
    speedInsights: true,
  })
});