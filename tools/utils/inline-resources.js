const { sync } = require('glob');
const { join, dirname, basename } = require('path');
const { readFileSync, writeFileSync } = require('fs-extra');

/** Inline resources for each js file in the directory. Do the same for metadata resources. */
function inlineResourcesForDirectory(directory, resourcePath) {
  // Inline for js files
  sync(join(directory, '**/*.js'))
    .forEach(path => inlineResources(path, resourcePath));

  // Inline for metadata files by building a mapping of resources to paths
  // recursively replacing them throughout the metadata files. This assumes
  // that all resource basenames are unique, which is fine for such a small
  // library. A better approach would be to look at the `origins` map and join
  // those with the relative urls.
  const resources = new Map();

  sync(join(directory, '**/*.+(html|css)'))
    .forEach(path => resources.set(basename(path), path));

  sync(join(directory, '**/**.metadata.json')).forEach(path => {
    let metadata = JSON.parse(readFileSync(path, 'utf-8'));
    inlineResourceForMetadata(metadata, resources);
    writeFileSync(path, JSON.stringify(metadata), 'utf-8');
  });
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
    // can to be parsed using the `eval` method. The value looks like "['AAA.scss', 'BBB.scss']"
    const styleUrls = eval(styleUrlsValue);

    const styleContents = styleUrls
      .map(url => join(dirname(filePath), url))
      .map(path => {
        if (path.endsWith('scss')) {
          path = path.slice(0, -4) + 'css';
        }

        return readFileSync(path, 'utf-8');
      })
      .map(css => escapeFileContents(css));

    return `styles: ["${styleContents.join(' ')}"]`;
  });
}

/** Escape file contents and convert to a single line. */
function escapeFileContents(contents) {
  return contents
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/g, '\\"');
}

/** Inline any templateUrl or styleUrls in the current object.  */
function inlineResourceForMetadata(metadata, resources) {
  // templates
  if (metadata.templateUrl) {
    const fullPath = resources.get(basename(metadata.templateUrl));
    metadata.template = readFileSync(fullPath, 'utf-8');
    delete metadata.templateUrl;
  }

  // styles
  if (metadata.styleUrls && metadata.styleUrls.length) {
    metadata.styles = [];
    for (let styleUrl of metadata.styleUrls) {
      if (styleUrl.endsWith('scss')) {
        styleUrl = styleUrl.slice(0, -4) + 'css';
      }
      const fullPath = resources.get(basename(styleUrl));
      metadata.styles.push(readFileSync(fullPath, 'utf-8'));
    }
    delete metadata.styleUrls;
  }

  // recurse! recurse!
  if (!metadata.template && !metadata.styles) {
    for (const property in metadata) {
      if (typeof metadata[property] == 'object' && metadata[property]) {
        inlineResourceForMetadata(metadata[property], resources);
      }
    }
  }
}

module.exports = inlineResourcesForDirectory;
