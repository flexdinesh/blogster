import type { RenderableTreeNode } from "@markdoc/markdoc";
import type {
  ExternalPostFrontmatter,
  MarkdownPostFrontmatter,
} from "./frontmatter";
import { getBlogPost, getAllBlogPosts } from "./read";
// import { ContentType } from "./types";

type Post = {
  content: RenderableTreeNode;
  frontmatter: ExternalPostFrontmatter | MarkdownPostFrontmatter;
  slug: string;
};

type Content = {
  glob: () => Promise<{
    blog: Array<Post>;
  }>;
  // slug === filename
  // globBy: (arg: { type: ContentType; slug: string }) => Promise<Post>;
  globPostBySlug: (arg: { slug: string }) => Promise<Post>;
};

const content: Content = {
  glob: async () => {
    const posts = await getAllBlogPosts();

    return {
      blog: posts.items,
    };
  },
  globPostBySlug: async ({ slug }: { slug: string }) => {
    const post = await getBlogPost({
      filename: slug,
    });

    return post;
  },
};

export { content };
