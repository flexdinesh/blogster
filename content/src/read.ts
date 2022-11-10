import path from "path";
import { globby } from "globby";
import { parseAndTransform } from "./markdoc";
import { validateBlogFrontmatter } from "./frontmatter";
import { ContentType } from "./types";

async function getMarkdown({
  absolutePathToRepoRoot,
  type,
  filename,
}: {
  absolutePathToRepoRoot: string; // /some-absolute-path.../
  type: ContentType;
  filename: string; // abc-def.md
}) {
  const pathToFile = type === "page" ? "" : type;
  // .../content/pages/blog
  const absolutePathToDir = path.join(
    absolutePathToRepoRoot,
    "content/pages",
    pathToFile
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
  absolutePathToRepoRoot,
  type,
}: {
  absolutePathToRepoRoot: string;
  type: ContentType;
}) {
  const pathToFile = type === "page" ? "" : type;
  const absolutePathToDir = path.join(
    absolutePathToRepoRoot,
    "content/pages",
    pathToFile
  );

  // this gives filenames as array
  const allMarkdownPaths = await globby("**/*.md", {
    cwd: absolutePathToDir,
  });

  const items = await Promise.all(
    allMarkdownPaths.map(async (filename) => {
      const fileNameWithoutExtension = filename.replace(/\.[^.]*$/, "");
      return getMarkdown({
        absolutePathToRepoRoot,
        type: "blog",
        filename: fileNameWithoutExtension,
      });
    })
  );

  return { type, items };
}

export async function getBlogPost({
  absolutePathToRepoRoot,
  filename,
}: {
  absolutePathToRepoRoot: string;
  filename: string;
}) {
  const { content, frontmatter, slug, type } = await getMarkdown({
    absolutePathToRepoRoot,
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

export async function getAllBlogPosts({
  absolutePathToRepoRoot,
}: {
  absolutePathToRepoRoot: string;
}) {
  const { type, items } = await getAllMarkdown({
    absolutePathToRepoRoot,
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
