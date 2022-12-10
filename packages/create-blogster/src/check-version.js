'use strict';

const currentPkgJson = require('../package.json');
const getPackageJson = require('package-json');
const semver = require('semver');

async function checkVersion() {
  try {
    const { version } = await getPackageJson('create-blogster');
    if (typeof version !== 'string') {
      throw new Error(
        'version from package metadata was expected to be a string but was not'
      );
    }
    if (semver.lt(currentPkgJson.version, version)) {
      console.error(
        `⚠️  You're running an old version of create-blogster, please update to ${version}`
      );
    }
  } catch (err) {
    console.error(
      'A problem occurred fetching the latest version of create-blogster'
    );
    console.error(err);
  }
}

module.exports = {
  checkVersion,
};
