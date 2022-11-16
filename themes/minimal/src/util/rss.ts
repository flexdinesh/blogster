import rss from "@astrojs/rss";
import { content } from "@local/content";

export async function generateBlogRSSFeed({
  siteTitle,
  siteDescription,
  baseUrl,
}: {
  siteTitle: string;
  siteDescription: string;
  baseUrl: string;
}) {
  const { blog } = await content.glob();

  // removing trailing slash if found
  // https://example.com/ => https://example.com
  baseUrl = baseUrl.replace(/\/+$/g, "");

  const rssItems = blog.map(({ frontmatter, slug }) => {
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
