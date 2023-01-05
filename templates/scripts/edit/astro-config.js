'use strict';

const fs = require('fs-extra');
const { relativePathToTemplate } = require('./fs-util');

async function editAstroConfig(theme) {
  const templateDir = relativePathToTemplate(theme);

  await fs.ensureDirSync(templateDir);
  let FILE_AstroConfig = await fs.readFileSync(
    relativePathToTemplate(theme, 'astro.config.mjs'),
    'utf8'
  );

  // replace port with 3000
  FILE_AstroConfig = FILE_AstroConfig.split('\n')
    .map(line => {
      if (line.includes('const SERVER_PORT =')) {
        // NEW THEME CHANGE: here
        return line.replace(/9000|9001|9002|9003/g, '3000');
      } else if (line.includes('LIVE_URL =')) {
        return line.replace(
          /https:\/\/((?:\w+-)+\w+)\.netlify\.app/i,
          'https://yourwebsiteurl.com'
        );
      }
      return line;
    })
    .join('\n');

  await fs.writeFileSync(
    relativePathToTemplate(theme, 'astro.config.mjs'),
    FILE_AstroConfig
  );
  console.log(`Edited: astro.config.mjs for template: ${theme}`);
}

module.exports = {
  editAstroConfig,
};
