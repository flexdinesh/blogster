'use strict';

const fs = require('fs-extra');
const {
  relativePathToTemplate,
  relativePathFromRepoRoot,
} = require('./fs-util');

async function EDIT_FILE_pages_blog_astro(theme) {
  /* Edit import statement pages/blog.astro */
  let FILE_Blog = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/blog.astro'),
    'utf8'
  );
  FILE_Blog = FILE_Blog.replace('../../packages/shared/', '');
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/blog.astro'),
    FILE_Blog
  );
  console.log(`Edited: src/pages/blog.astro for template: ${theme}`);
}

async function EDIT_FILE_pages_projects_astro(theme) {
  /* Edit import statement pages/projects.astro */
  let FILE_Projects = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/projects.astro'),
    'utf8'
  );
  FILE_Projects = FILE_Projects.replace('../../packages/shared/', '');
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/projects.astro'),
    FILE_Projects
  );
  console.log(`Edited: src/pages/projects.astro for template: ${theme}`);
}

async function EDIT_FILE_pages_rss_xml_js(theme) {
  /* Edit import statement pages/rss.xml.js */
  let FILE_RssXml = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/rss.xml.js'),
    'utf8'
  );
  FILE_RssXml = FILE_RssXml.replace('../../packages/shared/', '');
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/rss.xml.js'),
    FILE_RssXml
  );
  console.log(`Edited: src/pages/rss.xml.js for template: ${theme}`);
}

async function EDIT_FILE_pages_blog_slug_astro(theme) {
  /* Edit import statement pages/blog/[slug].astro */
  let FILE_blog_slug = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/pages/blog/[slug].astro'),
    'utf8'
  );
  // do it twice because we have the path twice in this file
  FILE_blog_slug = FILE_blog_slug.replace('../../packages/shared/', '');
  FILE_blog_slug = FILE_blog_slug.replace('../../packages/shared/', '');
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/pages/blog/[slug].astro'),
    FILE_blog_slug
  );
  console.log(`Edited: src/pages/blog/[slug].astro for template: ${theme}`);
}

async function copySharedContent(theme) {
  const templateDir = relativePathToTemplate(theme);
  const srcContentDirectory = relativePathFromRepoRoot(
    'packages/shared/content'
  );
  const destContentDirectory = relativePathToTemplate(theme, 'content');

  await fs.ensureDirSync(templateDir);
  await fs.ensureDirSync(destContentDirectory);
  // copy entire directory
  // <reporoot>/packages/shared/content to <template>/content
  await fs.copySync(srcContentDirectory, destContentDirectory);

  await EDIT_FILE_pages_blog_astro(theme);
  await EDIT_FILE_pages_projects_astro(theme);
  await EDIT_FILE_pages_rss_xml_js(theme);
  await EDIT_FILE_pages_blog_slug_astro(theme);
}

module.exports = {
  copySharedContent,
};
