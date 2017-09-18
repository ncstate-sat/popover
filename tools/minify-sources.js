const uglify = require('uglify-js');
const { readFileSync, writeFileSync } = require('fs-extra');

/** Function to minify a file. */
function uglifyFile(inputPath, outputPath) {
  const code = readFileSync(inputPath, 'utf8');
  const result = uglify.minify(code);
  writeFileSync(outputPath, result.code);
}

module.exports = uglifyFile;
