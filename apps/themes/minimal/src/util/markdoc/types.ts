export type ContentType = "blog" | "project";

type Frontmatter<T> = T extends ContentType
  ? {
      type: T;
      title: string;
      date: Date;
    }
  : never;

export type MarkdownPostFrontmatter = Frontmatter<"blog"> & {
  isExternal: false;
  description?: string;
  ogImagePath?: string;
  canonicalUrl?: string;
};

export type ExternalPostFrontmatter = Frontmatter<"blog"> & {
  isExternal: true;
  url: string;
};

export type ProjectFrontmatter = Frontmatter<"project"> & {
  url: string;
};

export type FrontmatterType =
  | MarkdownPostFrontmatter
  | ExternalPostFrontmatter
  | ProjectFrontmatter;
