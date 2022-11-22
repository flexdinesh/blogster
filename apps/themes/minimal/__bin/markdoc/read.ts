import path from "path";
import { globby } from "globby";
import type { RenderableTreeNode } from "@markdoc/markdoc";
import { parseAndTransform } from "./transform";

const absolutePathToFile = ({
  pathToDir,
  filename,
  cwd,
}: {
  pathToDir: string;
  filename: string;
  cwd?: string;
}) => {
  const pathToFile = path.join(cwd ?? process.cwd(), pathToDir, filename);
  return pathToFile;
};

const absolutePathToFiles = async ({
  pathToDir,
  cwd,
}: {
  pathToDir: string;
  cwd?: string;
}) => {
  const markdownPaths = await globby(`${pathToDir}/*.md`, {
    cwd,
  });
  return markdownPaths;
};

type ReadAllArgsWithoutValidator = {
  pathToDir: string;
  cwd?: string;
  frontmatterValidator?: never;
};

type ReadAllArgsWithValidator<Return extends Record<string, unknown>> = {
  pathToDir: string;
  cwd?: string;
  frontmatterValidator?: (args: Record<string, unknown>) => Return;
};

type ReadAllArgsReturnType<
  Return extends Record<string, unknown> = Record<string, unknown>
> = Promise<
  {
    path: string;
    slug: string;
    frontmatter: Return;
    content: RenderableTreeNode;
  }[]
>;

async function readAll(
  args: ReadAllArgsWithoutValidator
): ReadAllArgsReturnType;

async function readAll<Return extends Record<string, unknown>>(
  args: ReadAllArgsWithValidator<Return>
): ReadAllArgsReturnType<Return>;

async function readAll<Return extends Record<string, unknown>>({
  pathToDir,
  cwd,
  frontmatterValidator,
}: ReadAllArgsWithoutValidator | ReadAllArgsWithValidator<Return>) {
  const paths = await absolutePathToFiles({
    pathToDir,
    cwd,
  });
  const files = await Promise.all(
    paths.map((path) => parseAndTransform({ path }))
  );

  if (frontmatterValidator) {
    const filesWithStronglyTypedFrontmatter = files.map((file) => {
      return {
        ...file,
        frontmatter: frontmatterValidator(file.frontmatter),
      };
    });

    return filesWithStronglyTypedFrontmatter;
  }

  return files;
}

type ReadOneArgsWithoutValidator = {
  pathToDir: string;
  filename: string;
  cwd?: string;
  frontmatterValidator?: never;
};

type ReadOneArgsWithValidator<Return extends Record<string, unknown>> = {
  pathToDir: string;
  filename: string;
  cwd?: string;
  frontmatterValidator?: (args: Record<string, unknown>) => Return;
};

type ReadOneArgsReturnType<
  Return extends Record<string, unknown> = Record<string, unknown>
> = Promise<{
  path: string;
  slug: string;
  frontmatter: Return;
  content: RenderableTreeNode;
}>;

async function readOne(
  args: ReadOneArgsWithoutValidator
): ReadOneArgsReturnType;

async function readOne<Return extends Record<string, unknown>>(
  args: ReadOneArgsWithValidator<Return>
): ReadOneArgsReturnType<Return>;

async function readOne<Return extends Record<string, unknown>>({
  pathToDir,
  filename,
  cwd,
  frontmatterValidator,
}: ReadOneArgsWithoutValidator | ReadOneArgsWithValidator<Return>) {
  const absolutePath = absolutePathToFile({ pathToDir, filename, cwd });

  const { content, frontmatter, path, slug } = await parseAndTransform({
    path: absolutePath,
  });

  if (frontmatterValidator) {
    return {
      content,
      frontmatter: frontmatterValidator(frontmatter),
      path,
      slug,
    };
  }

  return {
    content,
    frontmatter,
    path,
    slug,
  };
}

export { readOne, readAll };
