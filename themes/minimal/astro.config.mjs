import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO:
let BASE_URL = "http://localhost:3000";

export default defineConfig({
  site: BASE_URL,
  integrations: [sitemap()],
});
