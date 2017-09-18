const uglify = require('uglify-js');
const { readFileSync, writeFileSync } = require('fs-extra');

const FILENAME_REGEX = /[^\/]+$/;

/** Function to minify a file. Copy over sourcemaps as well. */
function uglifyFile(inputPath, outputPath) {
  const sourcemapIn = `${inputPath}.map`;
  const sourcemapOut = `${outputPath}.map`;

  const outputFilename = outputPath.match(FILENAME_REGEX)[0];
  const outputSourcemapFilename = `${outputFilename}.map`;

  const result = uglify.minify(
    readFileSync(inputPath, 'utf8'),
    {
      sourceMap: {
        content: readFileSync(sourcemapIn, 'utf8'),
        filename: outputFilename,
        url: outputSourcemapFilename,
      }
    }
  );

  writeFileSync(outputPath, result.code);
  writeFileSync(sourcemapOut, result.map);
}

module.exports = uglifyFile;
