'use strict';

const path = require('path');

function relativePathToTemplate(theme, p = '') {
  return path.join(path.normalize(`${process.cwd()}/${theme}`), p);
}

function relativePathFromRepoRoot(p = '') {
  return path.join(path.normalize(`${process.cwd()}/../`), p);
}

module.exports = {
  relativePathToTemplate,
  relativePathFromRepoRoot,
};
