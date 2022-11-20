import type { ContentType } from "./types";
import { readAll, readOne } from "./read";

const content = {
  glob: async () => {
    const posts = await readAll({ type: "blog" });
    const projects = await readAll({ type: "project" });

    return {
      blog: posts.items,
      projects: projects.items,
    };
  },
  globBySlug: async ({ type, slug }: { type: ContentType; slug: string }) => {
    const content = await readOne({
      type,
      filename: slug,
    });

    return content;
  },
};

export { content };
