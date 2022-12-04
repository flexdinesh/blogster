import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// TODO:
let BASE_URL = "http://localhost:9001";

export default defineConfig({
  server: { port: 9001 },
  site: BASE_URL,
  integrations: [tailwind(), sitemap()],
});
