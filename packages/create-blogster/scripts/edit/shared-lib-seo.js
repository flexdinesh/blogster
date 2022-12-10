'use strict';

const fs = require('fs-extra');
const {
  relativePathToTemplate,
  relativePathFromRepoRoot,
} = require('./fs-util');

async function EDIT_FILE_components_BlogPostMeta_astro(theme) {
  /* Edit import statement components/BlogPostMeta.astro */
  let FILE_BlogPostMeta = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/components/BlogPostMeta.astro'),
    'utf8'
  );
  FILE_BlogPostMeta = FILE_BlogPostMeta.replace(
    `@local/shared/seo`,
    `../lib/seo`
  );
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/components/BlogPostMeta.astro'),
    FILE_BlogPostMeta
  );
  console.log(
    `Edited: src/components/BlogPostMeta.astro for template: ${theme}`
  );
}

async function EDIT_FILE_components_PageMeta_astro(theme) {
  /* Edit import statement components/PageMeta.astro */
  let FILE_PageMeta = await fs.readFileSync(
    relativePathToTemplate(theme, 'src/components/PageMeta.astro'),
    'utf8'
  );
  FILE_PageMeta = FILE_PageMeta.replace(`@local/shared/seo`, `../lib/seo`);
  await fs.writeFileSync(
    relativePathToTemplate(theme, 'src/components/PageMeta.astro'),
    FILE_PageMeta
  );
  console.log(`Edited: src/components/PageMeta.astro for template: ${theme}`);
}

async function copySharedLibSeo(theme) {
  const templateDir = relativePathToTemplate(theme);
  const destDir = relativePathToTemplate(theme, 'src/lib');
  const srcSeoFile = relativePathFromRepoRoot('packages/shared/src/seo.ts');
  const destSeoFile = relativePathToTemplate(theme, 'src/lib/seo.ts');

  // copy <reporoot>/packages/shared/src/seo.ts to <template>/src/lib/seo.ts
  await fs.ensureDirSync(templateDir);
  await fs.ensureDirSync(destDir);
  await fs.copyFileSync(srcSeoFile, destSeoFile);

  await EDIT_FILE_components_BlogPostMeta_astro(theme);
  await EDIT_FILE_components_PageMeta_astro(theme);
}

module.exports = {
  copySharedLibSeo,
};
