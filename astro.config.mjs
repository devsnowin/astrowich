import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://astrowich.netlify.app',
  integrations: [tailwind(), image(), react(), solidJs()],
  adapter: netlify()
});