import path from "path";
import { globby } from "globby";
import { parseAndTransform } from "./markdoc";
import { validateFrontmatter } from "./frontmatter";
import type { ContentType } from "./types";
import { pathToContentDir } from "./util";

const typeToDirNameMap: Record<ContentType, string> = {
  blog: "blog",
  project: "projects",
};

async function getMarkdown({
  type,
  filename,
}: {
  type: ContentType;
  filename: string; // abc-def.md
}) {
  // .../content/blog
  const absolutePathToDir = path.join(pathToContentDir, typeToDirNameMap[type]);

  // .../content/blog/abc-def.md
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

async function getAllMarkdown({ type }: { type: ContentType }) {
  const pathToContentType = path.join(pathToContentDir, typeToDirNameMap[type]);

  // this gives filenames as as array
  const markdownPaths = await globby("**/*.md", {
    cwd: pathToContentType,
  });

  const items = await Promise.all(
    markdownPaths.map(async (filename) => {
      const fileNameWithoutExtension = filename.replace(/\.[^.]*$/, "");
      return getMarkdown({
        type,
        filename: fileNameWithoutExtension,
      });
    })
  );

  return { type, items };
}

export async function readOne({
  type,
  filename,
}: {
  type: ContentType;
  filename: string;
}) {
  const { content, frontmatter, slug } = await getMarkdown({
    type,
    filename,
  });
  const typedFrontmatter = validateFrontmatter({ type, frontmatter });
  return {
    content,
    frontmatter: typedFrontmatter,
    slug,
    type,
  };
}

export async function readAll({ type }: { type: ContentType }) {
  const { items } = await getAllMarkdown({
    type,
  });

  const validatedItems = items.map((item) => {
    const { content, frontmatter, slug } = item;
    const typedFrontmatter = validateFrontmatter({ type, frontmatter });
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
