import path from "path";
import {globby} from "globby";
import { parseAndTransform } from "./markdoc";
import { validateBlogFrontmatter } from "./frontmatter";
import type { ContentType } from "./types";
import { pathToContentDir } from "./util";

async function getMarkdown({
  type,
  filename,
}: {
  type?: ContentType;
  filename: string; // abc-def.md
}) {
  // .../content/blog
  const absolutePathToDir = path.join(
    pathToContentDir,
    type ?? ""
  );

  // .../content/blog/abc-def.md
  // .../content/about.md
  const absolutePathToFile = path.join(absolutePathToDir, `${filename}.md`);

  const { content, frontmatter } = await parseAndTransform({
    markdownFileAbsolutePath: absolutePathToFile,
  });

  return {
    content,
    frontmatter,
    slug: filename,
    type,
  };
}

async function getAllMarkdown({
  type,
}: {
  type?: ContentType;
}) {
  const pathToContentType = path.join(pathToContentDir, type ?? "");

  // this gives filenames as as array
  const markdownPaths = await globby("**/*.md", {
    cwd: pathToContentType,
  });

  const items = await Promise.all(
    markdownPaths.map(async (filename) => {
      const fileNameWithoutExtension = filename.replace(/\.[^.]*$/, "");
      return getMarkdown({
        type: "blog",
        filename: fileNameWithoutExtension,
      });
    })
  );

  return { type, items };
}

export async function getBlogPost({
  filename,
}: {
  filename: string;
}) {
  const { content, frontmatter, slug, type } = await getMarkdown({
    type: "blog",
    filename,
  });
  const typedFrontmatter = validateBlogFrontmatter(frontmatter);
  return {
    content,
    frontmatter: typedFrontmatter,
    slug,
    type,
  };
}

export async function getAllBlogPosts() {
  const { type, items } = await getAllMarkdown({
    type: "blog",
  });

  const validatedItems = items.map((item) => {
    const { content, frontmatter, slug, type } = item;
    const typedFrontmatter = validateBlogFrontmatter(frontmatter);
    return {
      content,
      frontmatter: typedFrontmatter,
      slug,
      type,
    };
  });

  return {
    type,
    items: validatedItems,
  };
}
