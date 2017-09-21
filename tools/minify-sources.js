const { basename } = require('path');
const uglify = require('uglify-js');
const { readFileSync, writeFileSync } = require('fs-extra');

/** Function to minify a file. Copy over sourcemaps as well. */
function uglifyFile(inputPath, outputPath) {
  const sourcemapIn = `${inputPath}.map`;
  const sourcemapOut = `${outputPath}.map`;
  const outputFilename = basename(outputPath);

  const result = uglify.minify(
    readFileSync(inputPath, 'utf-8'),
    {
      sourceMap: {
        content: readFileSync(sourcemapIn, 'utf-8'),
        filename: outputFilename,
        url: `${outputFilename}.map`,
      }
    }
  );

  writeFileSync(outputPath, result.code);
  writeFileSync(sourcemapOut, result.map);
}

module.exports = uglifyFile;
