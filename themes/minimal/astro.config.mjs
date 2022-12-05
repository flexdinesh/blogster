/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// if you are not using Netlify, you could set your URL manually like this
// this is the astro command your npm script runs
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");

let BASE_URL = "http://localhost:9000";

// If you're using Netlify, your deploy URL will be available as
// an environment variable URL during build.
if (isBuild && process.env.URL) {
  BASE_URL = process.env.URL;
}
// If you're not Netlify, you could just set your URL manually
if (isBuild && !process.env.URL) {
  BASE_URL = "https://blogster-minimal.netlify.app";
}

export default defineConfig({
  server: { port: 9000 },
  site: BASE_URL,
  integrations: [tailwind(), sitemap()],
});
