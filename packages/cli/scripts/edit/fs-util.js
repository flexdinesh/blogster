'use strict';

const path = require('path');

function relativePathToTemplate(theme, p = '') {
  return path.join(path.normalize(`${__dirname}/../../templates/${theme}`), p);
}

function relativePathFromRepoRoot(p = '') {
  return path.join(path.normalize(`${__dirname}/../../../../`), p);
}

module.exports = {
  relativePathToTemplate,
  relativePathFromRepoRoot,
};
