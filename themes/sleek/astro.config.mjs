import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// TODO:
let BASE_URL = "http://localhost:3000";

export default defineConfig({
  site: BASE_URL,
  integrations: [tailwind(), sitemap()],
});
