'use strict';

const path = require('path');
const fs = require('fs-extra');
const { editPackageJson } = require('./edit/package-json');
const { editAstroConfig } = require('./edit/astro-config');
const { copySharedLibSeo } = require('./edit/shared-lib-seo');
const { copySharedLibMarkdoc } = require('./edit/shared-lib-markdoc');
const { copySharedContent } = require('./edit/shared-content');

async function editTemplate(theme) {
  process.stdout.write('\n');
  console.log(`...Editing template: ${theme}`);

  // edit package.json name
  await editPackageJson(theme);
  // copy astro.config.mjs
  await editAstroConfig(theme);
  // copy seo.ts and edit imports
  await copySharedLibSeo(theme);
  // copy markdoc dir and edit imports
  await copySharedLibMarkdoc(theme);
  // copy content dir and edit imports
  await copySharedContent(theme);

  console.log(`✅ Edited template: ${theme}`);
  process.stdout.write('\n');
}

(async () => {
  await fs.ensureDirSync(
    path.join(path.normalize(`${__dirname}/../templates`))
  );
  // NEW THEME CHANGE: here
  const themes = ['minimal', 'sleek', 'newspaper'];
  // edit all templates - copy from shared packages and edit file imports
  for (const theme of themes) {
    await editTemplate(theme);
  }
})();
