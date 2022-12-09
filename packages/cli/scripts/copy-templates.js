'use strict';

const path = require('path');
const fs = require('fs-extra');

async function deleteAllTemplates() {
  process.stdout.write('\n');
  console.log('...Deleting templates');
  const minimalTemplateDir = path.join(
    path.normalize(`${__dirname}/../templates/minimal`)
  );
  const sleekTemplateDir = path.join(
    path.normalize(`${__dirname}/../templates/sleek`)
  );

  await fs.removeSync(minimalTemplateDir);
  await fs.removeSync(sleekTemplateDir);
  console.log('✅ Deleted all templates');
  process.stdout.write('\n');
}

function fsCopyFilter(path) {
  const directoriesToExclude = ['node_modules', '.turbo', '.vscode', 'dist'];
  const shouldCopy = !directoriesToExclude.some(d => path.includes(d));
  const log = shouldCopy ? `copied ${path}` : `filtered ${path}`;
  console.log(log);
  return shouldCopy;
}

async function copyMinimal() {
  process.stdout.write('\n');
  console.log('...Copying template: minimal');
  process.stdout.write('\n');

  const themeDir = path.join(
    path.normalize(`${__dirname}/../../../themes/minimal`)
  );
  const templateDir = path.join(
    path.normalize(`${__dirname}/../templates/minimal`)
  );

  await fs.ensureDirSync(templateDir);
  await fs.copySync(themeDir, templateDir, {
    overwrite: false,
    filter: fsCopyFilter,
  });

  process.stdout.write('\n');
  console.log('✅ Copied template: minimal');
  process.stdout.write('\n');
}

async function copySleek() {
  process.stdout.write('\n');
  console.log('...Copying template: sleek');
  process.stdout.write('\n');

  const themeDir = path.join(
    path.normalize(`${__dirname}/../../../themes/sleek`)
  );
  const templateDir = path.join(
    path.normalize(`${__dirname}/../templates/sleek`)
  );

  await fs.ensureDirSync(templateDir);
  await fs.copySync(themeDir, templateDir, {
    overwrite: false,
    filter: fsCopyFilter,
  });

  process.stdout.write('\n');
  console.log('✅ Copied template: sleek');
  process.stdout.write('\n');
}

(async () => {
  await deleteAllTemplates();
  await fs.ensureDirSync(
    path.join(path.normalize(`${__dirname}/../templates`))
  );
  await copyMinimal();
  await copySleek();
})();
