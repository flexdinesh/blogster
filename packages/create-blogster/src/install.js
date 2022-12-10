'use strict';

const execa = require('execa');
const ora = require('ora');

const install = async cwd => {
  const spinner = ora(
    'Installing dependencies with yarn. This may take a few minutes.'
  ).start();
  try {
    await execa('yarn', ['install'], { cwd });
    spinner.succeed('Installed dependencies with yarn.');
    return 'yarn';
  } catch (_err) {
    let err = _err;
    if (err.failed) {
      process.stdout.write('\n');
      spinner.warn('Failed to install with yarn.');
      spinner.start(
        'Installing dependencies with npm. This may take a few minutes.'
      );
      try {
        await execa('npm', ['install'], { cwd });
        spinner.succeed('Installed dependencies with npm.');
      } catch (npmErr) {
        spinner.fail('Failed to install with npm.');
        throw npmErr;
      }
      process.stdout.write('\n');
      return 'npm';
    }
    throw err;
  }
};

module.exports = {
  install,
};
