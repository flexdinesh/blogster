import fs from "fs/promises";
import jsyaml from "js-yaml";
import Markdoc from "@markdoc/markdoc";
import { config } from "./config";

const { load } = jsyaml;

function extractFrontmatter(content: string) {
  const frontMatterPattern = /^---[\s]+([\s\S]*?)[\s]+---/;
  const match = frontMatterPattern.exec(content);
  if (!match) {
    throw new Error(
      "Expected post to contain frontmatter with a title, description and publishDate"
    );
  }
  const frontmatter = match[1];
  let parsed;
  try {
    parsed = load(frontmatter);
  } catch (err) {
    throw new Error(`Failed to parse frontmatter as yaml: ${err}`);
  }
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error(
      `Expected frontmatter yaml to be an object but found:\n${JSON.stringify(
        parsed
      )}`
    );
  }
  const obj = parsed as Record<string, unknown>;
  return obj;
}

export async function parseAndTransform({ path }: { path: string }) {
  const rawMarkdown = await fs.readFile(path, "utf8");
  const ast = Markdoc.parse(rawMarkdown);

  const errors = Markdoc.validate(ast, config);
  if (errors.length) {
    console.error(errors);
    throw new Error("Markdoc validation error");
  }
  const transformedContent = Markdoc.transform(ast, config);
  const frontmatter = extractFrontmatter(rawMarkdown);

  const filename = path.split("/").pop();
  if (typeof filename !== "string") {
    throw new Error("Check what went wrong");
  }
  const fileNameWithoutExtension = filename.replace(/\.[^.]*$/, "");

  return {
    path,
    slug: fileNameWithoutExtension,
    frontmatter: frontmatter,
    content: transformedContent,
  };
}
