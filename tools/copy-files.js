const { sync } = require('glob');
const { mkdirpSync, copySync } = require('fs-extra');
const { join, dirname } = require('path');

/** Function to copy files that match a glob to another directory. */
function copyFiles(inDir, fileGlob, outDir) {
  sync(fileGlob, { cwd: inDir })
    .forEach(filePath => {
      const fileDestPath = join(outDir, filePath);
      mkdirpSync(dirname(fileDestPath));
      copySync(join(inDir, filePath), fileDestPath);
    });
}

module.exports = copyFiles;
