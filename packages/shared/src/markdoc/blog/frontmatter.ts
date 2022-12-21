import datefns from "date-fns";

const { isMatch, format, parse } = datefns;
const dateFormat = "yyyy-MM-dd";

// for posts with content in *.md file
type MarkdownPostFrontmatter = {
  title: string;
  description?: string;
  date: Date;
  external: false;
  ogImagePath?: string;
  canonicalUrl?: string;
};

// for posts that are just links to external posts
type ExternalPostFrontmatter = {
  title: string;
  date: Date;
  external: true;
  url: string;
};

export function validateBlogFrontmatter(
  frontmatter: Record<string, unknown>
): MarkdownPostFrontmatter | ExternalPostFrontmatter {
  if (Object.keys(frontmatter).length < 1) {
    throw new Error("Frontmatter should be an object with keys");
  }

  // frontmatter.title
  if (typeof frontmatter.title !== "string") {
    throw new Error("Frontmatter.title is missing. String expected.");
  }

  // description is important for og:description
  // if (typeof frontmatter.description !== "string") {
  //   throw new Error("Frontmatter.description is missing. String expected.");
  // }

  // frontmatter.date
  if (
    typeof frontmatter.date !== "string" &&
    !((frontmatter.date as unknown) instanceof Date)
  ) {
    throw new Error(
      "Frontmatter.date is missing. Date expected in format yyyy-MM-dd."
    );
  } else {
    if (typeof frontmatter.date === "string") {
      frontmatter.date = parse(frontmatter.date, dateFormat, new Date());
      const formattedDate = format(frontmatter.date as Date, dateFormat);
      if (!isMatch(formattedDate, dateFormat)) {
        throw new Error(
          "Frontmatter.date is not a valid date string. Date expected in format yyyy-MM-dd."
        );
      }
    } else if ((frontmatter.date as unknown) instanceof Date) {
      const formattedDate = format(frontmatter.date as Date, dateFormat);
      if (!isMatch(formattedDate, dateFormat)) {
        throw new Error(
          "Frontmatter.date is not a valid date string. Date expected in format yyyy-MM-dd."
        );
      }
    }
  }

  // frontmatter.url (external links)
  if (
    frontmatter.external === "true" ||
    frontmatter.external === true ||
    frontmatter.url
  ) {
    if (typeof frontmatter.url !== "string") {
      throw new Error(
        "Frontmatter.url is missing. Posts marked (external: true) should have a url."
      );
    }

    return {
      ...frontmatter,
      external: true,
    } as ExternalPostFrontmatter;
  }

  return {
    ...frontmatter,
    external: false,
  } as MarkdownPostFrontmatter;
}
