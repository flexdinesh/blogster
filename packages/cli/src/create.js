/* 
  Approach heavily inspired by create-keystone-app
  https://github.com/keystonejs/create-keystone-app
*/

'use strict';

const path = require('path');
const fs = require('fs-extra');
const meow = require('meow');
const enquirer = require('enquirer');
// const { install } = require('./install');
const { logCreateConfirmation, logSuccessInfo } = require('./console');

const cli = meow(
  `
Usage
  $ create-blogster <directory>

  Options
	  --theme  Pick a theme

	Examples
	  $ create-blogster my-blog --sleek
`,
  {
    flags: {
      theme: {
        type: 'string',
      },
    },
  }
);

async function normalizeArgs() {
  let directory = cli.input[0];
  if (!directory) {
    ({ directory } = await enquirer.prompt({
      type: 'input',
      name: 'directory',
      message: 'What directory should your blog be generated into?',
      validate: x => !!x,
    }));
    process.stdout.write('\n');
  }

  let theme = cli.flags.theme;
  if (!theme) {
    ({ theme } = await enquirer.prompt({
      type: 'select',
      name: 'theme',
      message: 'Pick a theme',
      choices: ['minimal', 'sleek'],
      validate: x => !!x,
    }));
    process.stdout.write('\n');
  }

  return {
    directory: path.resolve(directory),
    theme: theme,
  };
}

async function copyTemplateDirectory(theme, directory) {
  const minimalTemplateDir = path.normalize(`${__dirname}/../templates/minimal`);
  const sleekTemplateDir = path.normalize(`${__dirname}/../templates/sleek`);
  // sleek is default
  let templateDir = sleekTemplateDir;
  switch (theme.toLowerCase()) {
    case 'minimal': {
      templateDir = minimalTemplateDir;
      break;
    }
    case 'sleek': {
      templateDir = sleekTemplateDir;
      break;
    }
    default: {
      templateDir = sleekTemplateDir;
    }
  }

  const srcDir = path.join(templateDir);
  const destDir = path.join(directory);
  await fs.copySync(srcDir, destDir, { overwrite: true });
}

async function createBlogster() {
  logCreateConfirmation();
  const { directory, theme } = await normalizeArgs();
  await fs.mkdir(directory);
  await copyTemplateDirectory(theme, directory);
  // const packageManager = await install(directoryName);
  const packageManager = 'yarn';
  const relativeProjectDir = path.relative(process.cwd(), directory);
  logSuccessInfo(packageManager, relativeProjectDir, theme);
}

module.exports = {
  createBlogster,
};
