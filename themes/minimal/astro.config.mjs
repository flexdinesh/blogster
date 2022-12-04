import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO:
let BASE_URL = "http://localhost:9000";

export default defineConfig({
  server: { port: 9000 },
  site: BASE_URL,
  integrations: [sitemap()],
});
