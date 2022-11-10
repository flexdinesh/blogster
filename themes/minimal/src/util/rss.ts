import rss from "@astrojs/rss";
import { getAllBlogPosts } from "@local/content";

export async function generateBlogRSSFeed({
  siteTitle,
  siteDescription,
  baseUrl,
  absolutePathToRepoRoot,
}: {
  siteTitle: string;
  siteDescription: string;
  baseUrl: string;
  absolutePathToRepoRoot: string;
}) {
  const { items } = await getAllBlogPosts({
    absolutePathToRepoRoot,
  });

  // removing trailing slash if found
  // https://example.com/ => https://example.com
  baseUrl = baseUrl.replace(/\/+$/g, "");

  const rssItems = items.map(({ frontmatter, slug }) => {
    if (frontmatter.isExternal) {
      const title = frontmatter.title;
      const pubDate = frontmatter.date;
      const link = frontmatter.url;

      return {
        title,
        pubDate,
        link,
      };
    }

    const title = frontmatter.title;
    const pubDate = frontmatter.date;
    const description = frontmatter.description;
    const link = `${baseUrl}/blog/${slug}`;

    return {
      title,
      pubDate,
      description,
      link,
    };
  });

  return rss({
    title: siteTitle,
    description: siteDescription,
    site: baseUrl,
    items: rssItems,
  });
}
export const get = async () => {};
