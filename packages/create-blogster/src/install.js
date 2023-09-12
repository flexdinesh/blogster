'use strict';

const execa = require('execa');
const ora = require('ora');

const detectUserAgent = () => {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) {
    return undefined;
  }

  return userAgent.split(' ')[0].split('/')[0];
}

const install = async cwd => {
  const pkgManager = detectUserAgent() || 'yarn';
  const spinner = ora(
    `Installing dependencies with ${pkgManager}. This may take a few minutes.`
  ).start();

  try {
    await execa(pkgManager, ['install'], { cwd });
    spinner.succeed(`Installed dependencies with ${pkgManager}.`);
    return pkgManager;
  } catch (_err) {
    let err = _err;
    if (err.failed) {
      process.stdout.write('\n');
      spinner.warn(`Failed to install with ${pkgManager}.`);
      if (pkgManager === 'npm') {
        throw err;
      }
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
