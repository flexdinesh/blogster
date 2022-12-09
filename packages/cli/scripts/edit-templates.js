'use strict';

const path = require('path');
const fs = require('fs-extra');
const { editPackageJson } = require('./edit/package-json');

async function editMinimal() {
  const theme = 'minimal';
  process.stdout.write('\n');
  console.log(`...Editing template: ${theme}`);
  process.stdout.write('\n');

  // edit package.json name
  await editPackageJson(theme);

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
