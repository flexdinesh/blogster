/* 
  CLI approach heavily inspired by create-keystone-app
  https://github.com/keystonejs/create-keystone-app
*/

'use strict';

const { downloadTemplate } = require('giget');
const path = require('path');
const fs = require('fs-extra');
const meow = require('meow');
const enquirer = require('enquirer');
const chalk = require('chalk');
const { install } = require('./install');
const { logCreateConfirmation, logSuccessInfo } = require('./console');

const cli = meow(
  `
Usage
  $ create-blogster <directory>

Options
  --theme Pick a theme (minimal/sleek/newspaper)

Examples
  $ create-blogster my-blog --theme sleek
`,
  {
    flags: {
      theme: {
        type: 'string',
      },
      // during development, we pass --no-deps flag
      deps: {
        type: 'boolean',
        default: true,
      },
      // during development, we pass --templatebranch dev 
      // to test the templates in dev branch before merging to main
      templatebranch: {
        type: 'string',
        default: 'main',
      },
    },
  }
);

async function promptArgs() {
  let directory = cli.input[0];
  if (!directory) {
    ({ directory } = await enquirer.prompt({
      type: 'input',
      name: 'directory',
      message: 'What directory should your blog be generated into?',
      initial: 'my-blogster-blog',
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
      initial: 'sleek',
      // NEW THEME CHANGE: here
      choices: ['minimal', 'sleek', 'newspaper', 'bubblegum'],
      validate: x => !!x,
    }));
    process.stdout.write('\n');
  }

  return {
    directory: path.resolve(directory),
    theme: theme,
    deps: cli.flags.deps,
    templatebranch: cli.flags.templatebranch,
  };
}

async function downloadTemplateDirectory(theme, directory, templatebranch) {
  try {
    await downloadTemplate(`flexdinesh/blogster/templates/${theme}#${templatebranch}`, {
      force: true,
      forceClean: true,
      provider: 'github',
      dir: directory,
    });
  } catch (err) {
    fs.rmdirSync(directory);
    if (err.message.includes('404')) {
      console.error(`Theme ${chalk.underline(theme)} does not exist!`);
    } else {
      console.error(err.message);
    }
    process.exit(1);
  }
}

async function createBlogster() {
  logCreateConfirmation();
  const { directory, theme, deps, templatebranch } = await promptArgs();
  await fs.mkdir(directory);
  await downloadTemplateDirectory(theme, directory, templatebranch);
  let packageManager = 'yarn';
  if (deps) {
    packageManager = await install(directory);
  }
  const relativeProjectDir = path.relative(process.cwd(), directory);
  logSuccessInfo(packageManager, relativeProjectDir, theme);
}

module.exports = {
  createBlogster,
};
