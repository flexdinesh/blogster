import path from "path";
import url from "url";

const { fileURLToPath } = url;

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

// .../pages
export const pathToContentPages = path.join(__dirname, "../", "pages");

console.log({ pathToContentPages });
