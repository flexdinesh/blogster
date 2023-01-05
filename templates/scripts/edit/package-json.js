'use strict';

const fs = require('fs-extra');
const { relativePathToTemplate } = require('./fs-util');

async function editPackageJson(theme) {
  const templateDir = relativePathToTemplate(theme);

  await fs.ensureDirSync(templateDir);
  let packageJson = await fs.readFileSync(
    relativePathToTemplate(theme, 'package.json'),
    'utf8'
  );

  // remove @local/shared package
  packageJson = packageJson
    .split('\n')
    .filter(line => {
      if (line.includes('@local/shared')) {
        return false;
      }
      return true;
    })
    .join('\n');

  // edit package.json name
  packageJson = packageJson.replace(
    `@theme/${theme}`,
    `blogster-${theme}`
  );

  await fs.writeFileSync(
    relativePathToTemplate(theme, 'package.json'),
    packageJson
  );
  console.log(`Edited: package.json for template: ${theme}`);
}

module.exports = {
  editPackageJson,
};
