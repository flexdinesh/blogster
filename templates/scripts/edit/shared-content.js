'use strict';

const fs = require('fs-extra');
const {
  relativePathToTemplate,
  relativePathFromRepoRoot,
} = require('./fs-util');

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
}

module.exports = {
  copySharedContent,
};
