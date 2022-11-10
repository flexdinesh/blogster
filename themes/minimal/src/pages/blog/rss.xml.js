import path from "path";
import rss from "@astrojs/rss";
import { generateBlogRSSFeed } from "../../util/rss";

import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "../../config";

export const get = async () => {
  const absolutePathToRepoRoot = path.join(process.cwd(), "..", "..");

  return generateBlogRSSFeed({
    absolutePathToRepoRoot,
    baseUrl: SITE_URL,
    siteTitle: SITE_TITLE,
    siteDescription: SITE_DESCRIPTION,
  });
};
