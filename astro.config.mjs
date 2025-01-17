import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercelServerless from '@astrojs/vercel/serverless'; // Changed this line

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: vercelServerless() // And this line
});