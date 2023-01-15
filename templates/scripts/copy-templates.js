"use strict";

const path = require("path");
const fs = require("fs-extra");

function fsCopyFilter(path) {
  const directoriesToExclude = ["node_modules", ".turbo", ".vscode", "dist"];
  const shouldCopy = !directoriesToExclude.some((d) => path.includes(d));
  const log = shouldCopy ? `copied ${path}` : `filtered ${path}`;
  console.log(log);
  return shouldCopy;
}

async function copyTheme(theme) {
  process.stdout.write("\n");
  console.log(`...Copying template: ${theme}`);

  const themeDir = path.join(
    path.normalize(`${process.cwd()}/../themes/${theme}`)
  );
  const templateDir = path.join(
    path.normalize(`${process.cwd()}/${theme}`)
  );

  await fs.ensureDirSync(templateDir);
  await fs.copySync(themeDir, templateDir, {
    overwrite: false,
    filter: fsCopyFilter,
  });

  console.log(`✅ Copied template: ${theme}`);
}

async function deleteTemplate(theme) {
  const templateDir = path.join(path.normalize(`${process.cwd()}/${theme}`));
  process.stdout.write("\n");
  console.log(`...Deleting template: ${theme}`);

  await fs.removeSync(templateDir);
  console.log(`✅ Deleted template: ${theme}`);
}

(async () => {
  try {
    // NEW THEME CHANGE: here
    const themes = ["minimal", "sleek", "newspaper", "bubblegum"];
    // delete all existing templates
    for (const theme of themes) {
      await deleteTemplate(theme);
    }
    // copy themes and create fresh templates
    for (const theme of themes) {
      await copyTheme(theme);
    }
  } catch (e) {
    console.error(e);
  }
})();
