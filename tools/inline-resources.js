const { sync } = require('glob');
const { join, dirname } = require('path');
const { readFileSync, writeFileSync } = require('fs-extra');
const sass = require('node-sass');

/** Inline resources for each js file in the directory. */
function inlineResourcesForDirectory(directory, resourcePath) {
  sync(join(directory, '**/*.js'))
    .forEach(file => inlineResources(file, resourcePath));
}

/** Inline external template and style resources. */
function inlineResources(filePath, resourcePath) {
  let fileContent = readFileSync(filePath, 'utf-8');

  fileContent = inlineTemplate(fileContent, filePath, resourcePath);
  fileContent = inlineStyles(fileContent, filePath, resourcePath);

  writeFileSync(filePath, fileContent, 'utf-8');
}

/** Inline the template content. */
function inlineTemplate(fileContent, filePath, resourcePath) {
  return fileContent.replace(/templateUrl:\s*'([^']+?\.html)'/g, (_match, templateUrl) => {
    const templatePath = join(dirname(filePath), templateUrl);
    const templateContent = escapeFileContents(readFileSync(templatePath, 'utf-8'));
    return `template: "${templateContent}"`;
  });
}

/** Compile and inline the stylesheets. */
function inlineStyles(fileContent, filePath, resourcePath) {
  return fileContent.replace(/styleUrls:\s*(\[[\s\S]*?])/gm, (_match, styleUrlsValue) => {
    // The RegExp matches the array of external style files. This is a string right now and
    // can to be parsed using the `eval` method. The value looks like "['AAA.css', 'BBB.css']"
    const styleUrls = eval(styleUrlsValue);

    const styleContents = styleUrls
      .map(url => join(dirname(filePath), url))
      .map(path => compileSassFile(path))
      .map(css => escapeFileContents(css));

    return `styles: ["${styleContents.join(' ')}"]`;
  });
}

/** Compile a sass file and return the compiled css. */
function compileSassFile(filePath) {
  const result = sass.renderSync({ file: filePath });
  return result.css.toString();
}

/** Escape file contents and convert to a single line. */
function escapeFileContents(contents) {
  return contents
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/g, '\\"');
}

module.exports = inlineResourcesForDirectory;
