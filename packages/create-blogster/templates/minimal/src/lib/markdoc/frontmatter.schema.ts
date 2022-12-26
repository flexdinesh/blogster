import { z } from "zod";

const blogBase = z.object({
  draft: z.boolean().default(false),
  title: z.string({
    required_error: "Required frontmatter missing: title",
    invalid_type_error: "title must be a string",
  }),
  date: z.date({
    required_error: "Required frontmatter missing: date",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),
});

const blogMarkdown = blogBase.extend({
  external: z.literal(false),
  description: z.optional(z.string()),
  ogImagePath: z.optional(z.string()),
  canonicalUrl: z.optional(z.string()),
});

const blogExternal = blogBase.extend({
  external: z.literal(true),
  url: z.string({
    required_error:
      "external is true but url is missing. url must be set for posts marked as external.",
    invalid_type_error: "external should be string.",
  }),
});

/*
  blog posts could be the posts written in markdown files or you could also 
  link to the posts you have already written in another blogging website.
  That's why we the frontmatter schema for blog posts is one of the two.
  If you don't want to link posts written in another website, you could
  just export blogMarkdown as your blog schema.
*/
export const blog = z.discriminatedUnion("external", [
  blogMarkdown,
  blogExternal,
]);

export const project = z.object({
  draft: z.boolean().default(false),
  title: z.string({
    required_error: "Required frontmatter missing: title",
    invalid_type_error: "title must be a string",
  }),
  date: z.date({
    required_error: "Required frontmatter missing: date",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),
  url: z.string(),
});
