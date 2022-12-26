'use strict';

const fs = require('fs-extra');
const {
  relativePathToTemplate,
  relativePathFromRepoRoot,
} = require('./fs-util');

async function EDIT_FILE_pages_blog_astro(theme) {
  /* Edit import statements pages/blog.astro */
  let FILE_blog = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/blog.astro'),
    'utf8'
  );
  FILE_blog = FILE_blog.replaceAll(
    `@local/shared/markdoc/`,
    `../lib/markdoc/`
  );
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/blog.astro'),
    FILE_blog
  );
  console.log(`Edited: src/pages/blog.astro for template: ${theme}`);
}

async function EDIT_FILE_pages_projects_astro(theme) {
  /* Edit import statements pages/projects.astro */
  let FILE_projects = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/projects.astro'),
    'utf8'
  );
  FILE_projects = FILE_projects.replaceAll(
    `@local/shared/markdoc/`,
    `../lib/markdoc/`
  );
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/projects.astro'),
    FILE_projects
  );
  console.log(`Edited: src/pages/projects.astro for template: ${theme}`);
}

async function EDIT_FILE_pages_rss_xml_ts(theme) {
  /* Edit import statements pages/rss.xml.ts */
  let FILE_rssXML = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/rss.xml.ts'),
    'utf8'
  );
  FILE_rssXML = FILE_rssXML.replaceAll(
    `@local/shared/markdoc/`,
    `../lib/markdoc/`
  );
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/rss.xml.ts'),
    FILE_rssXML
  );
  console.log(`Edited: src/pages/rss.xml.ts for template: ${theme}`);
}

async function EDIT_FILE_pages_blog_slug_astro(theme) {
  /* Edit import statements pages/blog/[slug].astro */
  let FILE_slug = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/blog/[slug].astro'),
    'utf8'
  );
  FILE_slug = FILE_slug.replaceAll(
    `@local/shared/markdoc/`,
    `../../lib/markdoc/`
  );
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/blog/[slug].astro'),
    FILE_slug
  );
  console.log(`Edited: src/pages/blog/[slug].astro for template: ${theme}`);
}

async function EDIT_FILE_lib_markdoc_read_ts(theme) {
  /* Edit relative import path statements lib/markdoc/read.ts */
  let FILE_readTs = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/lib/markdoc/read.ts'),
    'utf8'
  );
  FILE_readTs = FILE_readTs.replace(
    `../../packages/shared/content`,
    `./content`
  );
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/lib/markdoc/read.ts'),
    FILE_readTs
  );
  console.log(`Edited: src/lib/markdoc/read.ts for template: ${theme}`);
}

async function copySharedLibMarkdoc(theme) {
  const templateDir = relativePathToTemplate(theme);
  const srcMarkdocDirectory = relativePathFromRepoRoot(
    'packages/shared/src/markdoc'
  );
  const destMarkdocDirectory = relativePathToTemplate(theme, 'src/lib/markdoc');

  // copy <reporoot>/packages/shared/src/seo.ts to <template>/src/lib/seo.ts
  await fs.ensureDirSync(templateDir);
  await fs.ensureDirSync(destMarkdocDirectory);
  // copy entire directory
  // <reporoot>/packages/shared/src/markdoc to <template>/src/lib/markdoc
  await fs.copySync(srcMarkdocDirectory, destMarkdocDirectory);

  await EDIT_FILE_pages_blog_astro(theme);
  await EDIT_FILE_pages_projects_astro(theme);
  await EDIT_FILE_pages_rss_xml_ts(theme);
  await EDIT_FILE_pages_blog_slug_astro(theme);
  await EDIT_FILE_lib_markdoc_read_ts(theme);
}

module.exports = {
  copySharedLibMarkdoc,
};
