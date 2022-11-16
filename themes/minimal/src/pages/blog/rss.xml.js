import { generateBlogRSSFeed } from "../../util/rss";

import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "../../config";

export const get = async () => {

  return generateBlogRSSFeed({
    baseUrl: SITE_URL,
    siteTitle: SITE_TITLE,
    siteDescription: SITE_DESCRIPTION,
  });
};
