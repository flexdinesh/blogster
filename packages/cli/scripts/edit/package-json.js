'use strict';

const fs = require('fs-extra');
const { relativePathToFile, relativePathToTemplate } = require('./fs-util');

async function editPackageJson(theme) {
  const templateDir = relativePathToTemplate(theme);

  // edit package.json name
  await fs.ensureDirSync(templateDir);
  let packageJson = await fs.readFileSync(
    relativePathToFile(theme, 'package.json'),
    'utf8'
  );
  packageJson = packageJson.replace(
    `@theme/${theme}`,
    `blogster-blog-${theme}`
  );
  await fs.writeFileSync(
    relativePathToFile(theme, 'package.json'),
    packageJson
  );
  console.log(`Edited: package.json for template ${theme}`);
  process.stdout.write('\n');
}

module.exports = {
  editPackageJson,
};
