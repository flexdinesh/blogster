'use strict';

const path = require('path');
const fs = require('fs-extra');
const { editPackageJson } = require('./edit/package-json');
const { editAstroConfig } = require('./edit/astro-config');
const { copySharedLibSeo } = require('./edit/shared-lib-seo');
const { copySharedLibMarkdoc } = require('./edit/shared-lib-markdoc');

async function editMinimal() {
  const theme = 'minimal';
  process.stdout.write('\n');
  console.log(`...Editing template: ${theme}`);
  process.stdout.write('\n');

  // edit package.json name
  await editPackageJson(theme);
  // copy astro.config.mjs
  await editAstroConfig(theme);
  // copy seo.ts and edit imports
  await copySharedLibSeo(theme);
  // copy markdoc dir and edit imports
  await copySharedLibMarkdoc(theme);

  console.log(`✅ Edited template: ${theme}`);
  process.stdout.write('\n');
}

async function editSleek() {
  const theme = 'sleek';
  process.stdout.write('\n');
  console.log(`...Editing template: ${theme}`);
  process.stdout.write('\n');

  // edit package.json name
  await editPackageJson(theme);
  // copy astro.config.mjs
  await editAstroConfig(theme);
  // copy seo.ts and edit imports
  await copySharedLibSeo(theme);
  // copy markdoc dir and edit imports
  await copySharedLibMarkdoc(theme);

  console.log(`✅ Edited template: ${theme}`);
  process.stdout.write('\n');
}

(async () => {
  await fs.ensureDirSync(
    path.join(path.normalize(`${__dirname}/../templates`))
  );
  await editMinimal();
  await editSleek();
})();
