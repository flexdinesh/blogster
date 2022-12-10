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
  FILE_blog = FILE_blog.replace(
    `@local/shared/markdoc/read`,
    `../lib/markdoc/read`
  );
  FILE_blog = FILE_blog.replace(
    `@local/shared/markdoc/blog/frontmatter`,
    `../lib/markdoc/blog/frontmatter`
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
  FILE_projects = FILE_projects.replace(
    `@local/shared/markdoc/read`,
    `../lib/markdoc/read`
  );
  FILE_projects = FILE_projects.replace(
    `@local/shared/markdoc/project/frontmatter`,
    `../lib/markdoc/project/frontmatter`
  );
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/projects.astro'),
    FILE_projects
  );
  console.log(`Edited: src/pages/projects.astro for template: ${theme}`);
}

async function EDIT_FILE_pages_rss_xml_js(theme) {
  /* Edit import statements pages/rss.xml.js */
  let FILE_rssXML = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/rss.xml.js'),
    'utf8'
  );
  FILE_rssXML = FILE_rssXML.replace(
    `@local/shared/markdoc/read`,
    `../lib/markdoc/read`
  );
  FILE_rssXML = FILE_rssXML.replace(
    `@local/shared/markdoc/blog/frontmatter`,
    `../lib/markdoc/blog/frontmatter`
  );
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/rss.xml.js'),
    FILE_rssXML
  );
  console.log(`Edited: src/pages/rss.xml.js for template: ${theme}`);
}

async function EDIT_FILE_pages_blog_slug_astro(theme) {
  /* Edit import statements pages/blog/[slug].astro */
  let FILE_slug = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/blog/[slug].astro'),
    'utf8'
  );
  FILE_slug = FILE_slug.replace(
    `@local/shared/markdoc/read`,
    `../../lib/markdoc/read`
  );
  FILE_slug = FILE_slug.replace(
    `@local/shared/markdoc/blog/frontmatter`,
    `../../lib/markdoc/blog/frontmatter`
  );
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/blog/[slug].astro'),
    FILE_slug
  );
  console.log(`Edited: src/pages/blog/[slug].astro for template: ${theme}`);
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
  await EDIT_FILE_pages_rss_xml_js(theme);
  await EDIT_FILE_pages_blog_slug_astro(theme);
}

module.exports = {
  copySharedLibMarkdoc,
};
