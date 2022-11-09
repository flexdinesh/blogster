import path from "path";
import { globby } from "globby";
import { parseAndTransform } from "./markdoc";

type ContentType = "blog" | "notes" | "project" | "speaking";

export async function getMarkdown({
  absolutePathToRepoRoot,
  filename,
  type,
}: {
  absolutePathToRepoRoot: string;
  filename: string; // abc-def.md
  type: ContentType;
}) {
  // .../content/blog
  const absolutePathToDir = path.join(absolutePathToRepoRoot, "content", type);

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

export async function getAllMarkdown({
  absolutePathToRepoRoot,
  type,
}: {
  absolutePathToRepoRoot: string;
  type: ContentType;
}) {
  const absolutePathToDir = path.join(absolutePathToRepoRoot, "content", type);

  const allMarkdownPaths = await globby("**/*.md", {
    cwd: absolutePathToDir,
  });

  const items = await Promise.all(
    allMarkdownPaths.map(async (mdPath) => {
      const fileNameWithoutExtension = mdPath.replace(/\.[^.]*$/, "");
      const markdownFileAbsolutePath = path.join(
        absolutePathToRepoRoot,
        "content",
        type,
        mdPath
      );

      const { content, frontmatter } = await parseAndTransform({
        markdownFileAbsolutePath,
      });
      return {
        content,
        frontmatter,
        slug: fileNameWithoutExtension,
        type: type,
      };
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
  return getMarkdown({ absolutePathToRepoRoot, type: "blog", filename });
}

export async function getAllBlogPosts({
  absolutePathToRepoRoot,
}: {
  absolutePathToRepoRoot: string;
}) {
  return getAllMarkdown({ absolutePathToRepoRoot, type: "blog" });
}
