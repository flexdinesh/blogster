import type { ContentType } from "./types";
import { readAll, readOne } from "./read";

const content = {
  glob: async () => {
    const posts = await readAll({ type: "blog" });

    return {
      blog: posts.items,
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
