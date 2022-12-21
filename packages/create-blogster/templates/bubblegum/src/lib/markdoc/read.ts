import path from "path";
import { globby } from "globby";
import type { RenderableTreeNode } from "@markdoc/markdoc";
import { parseAndTransform } from "./transform";
import { validateBlogFrontmatter } from "./blog/frontmatter";
import { validateProjectFrontmatter } from "./project/frontmatter";

// path is relative to where you run the `yarn build` command
const pathToContentDir = path.normalize("./content");

type Content = {
  path: string;
  slug: string;
  content: RenderableTreeNode;
  frontmatter: Record<string, unknown>;
};

type ReturnTypeForBlog = Content & {
  frontmatter: ReturnType<typeof validateBlogFrontmatter>;
};
type ReturnTypeForProjects = Content & {
  frontmatter: ReturnType<typeof validateProjectFrontmatter>;
};

/* 
  If you are adding a new content directory like "notes" or "talk",
  you need to add a function overload for readAll and readOne.
*/
/* Overloads for readAll - start */
export async function readAll(args: {
  directory: "blog";
  excludeDrafts?: boolean;
}): Promise<ReturnTypeForBlog[]>;
export async function readAll(args: {
  directory: "projects";
  excludeDrafts?: boolean;
}): Promise<ReturnTypeForProjects[]>;
/* Overloads for readAll - end */

export async function readAll({
  directory,
  excludeDrafts = true,
}: {
  directory: string;
  excludeDrafts?: boolean;
}): Promise<Content[]> {
  const pathToDir = path.join(pathToContentDir, directory);
  const paths = await globby(`${pathToDir}/*.md`);

  const files = await Promise.all(
    paths.map((path) => parseAndTransform({ path }))
  );

  if (directory === "blog") {
    const content = files
      .map((file) => {
        return {
          ...file,
          frontmatter: validateBlogFrontmatter(file.frontmatter),
        };
      })
      .filter((c) => (excludeDrafts ? c.frontmatter.draft !== true : true));
    return content;
  }

  if (directory === "projects") {
    const content = files
      .map((file) => {
        return {
          ...file,
          frontmatter: validateProjectFrontmatter(file.frontmatter),
        };
      })
      .filter((c) => (excludeDrafts ? c.frontmatter.draft !== true : true));

    return content;
  }

  throw new Error(
    "type should be one of the available types in ContentDirectory. If you are adding a new directory in Content, then please make sure you include it in ContentType for strong frontmatter type."
  );
}

/* 
  If you are adding a new content directory like "notes" or "talk",
  you need to add a function overload for readAll and readOne.
*/
/* Overloads for readOne - start */
export async function readOne(args: {
  directory: "blog";
  filename: string;
}): Promise<ReturnTypeForBlog>;
export async function readOne(args: {
  directory: "projects";
  filename: string;
}): Promise<ReturnTypeForProjects>;
/* Overloads for readOne - end */

export async function readOne({
  directory,
  filename,
}: {
  directory: string;
  filename: string;
}) {
  const pathToDir = path.join(pathToContentDir, directory);
  const absolutePath = path.join(pathToDir, filename);

  const {
    content,
    frontmatter,
    path: filepath,
    slug,
  } = await parseAndTransform({
    path: absolutePath,
  });

  if (directory === "blog") {
    return {
      content,
      frontmatter: validateBlogFrontmatter(frontmatter),
      path: filepath,
      slug,
    };
  }
  if (directory === "projects") {
    return {
      content,
      frontmatter: validateProjectFrontmatter(frontmatter),
      path: filepath,
      slug,
    };
  }

  throw new Error(
    "type should be one of the available types in ContentType. If you are adding a new directory in Content, then please make sure you include it in ContentType for stronger frontmatter type."
  );
}
