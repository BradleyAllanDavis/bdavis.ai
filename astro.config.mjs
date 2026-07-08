// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build
export default defineConfig({
  site: 'https://bdavis.ai',
  // Static output (default). Deployed to Cloudflare Pages.

  integrations: [preact()],
});
