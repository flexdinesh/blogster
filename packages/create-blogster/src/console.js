'use strict';

const chalk = require('chalk');
const terminalLink = require('terminal-link');

function logCreateConfirmation() {
  process.stdout.write('\n');
  console.log(`✨ You're about to generate a ${chalk.bold('Blogster')} blog.
  `);
}

function logSuccessInfo(packageManager, relativeProjectDir, theme) {
  console.log(
    `${chalk.bold(chalk.green('✔ All done!'))}
    
  Blogster blog (theme: ${theme}) generated in: ${chalk.bold(
      relativeProjectDir
    )}
  
  ${chalk.bold('Start your development with:')}
  
    - cd ${relativeProjectDir}
    - ${packageManager === 'yarn' ? 'yarn' : 'npm run'} dev
  
${chalk.yellow(
  terminalLink(
    '🤩 Star Blogster on GitHub',
    'https://github.com/flexdinesh/blogster'
  )
)}

`
  );
}

module.exports = {
  logCreateConfirmation,
  logSuccessInfo,
};
