'use strict';

const path = require('path');

function relativePathToTemplate(theme) {
  return path.join(path.normalize(`${__dirname}/../../templates/${theme}`));
}

function relativePathToFile(theme, pathToFile) {
  return path.join(
    path.normalize(`${__dirname}/../../templates/${theme}`),
    pathToFile
  );
}

module.exports = {
  relativePathToTemplate,
  relativePathToFile,
};
