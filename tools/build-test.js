const { sync } = require('glob');
const { join } = require('path');
const { writeFileSync } = require('fs-extra');
const sass = require('node-sass');

const copyFiles = require('./utils/copy-files');
const inlineResources = require('./utils/inline-resources');
const spawn$ = require('./utils/rx-spawn');

// Directory constants
const BASE_DIR = process.cwd();
const LIB_DIR = join(BASE_DIR, 'src/lib');
const BUILD_DIR = join(BASE_DIR, '.ng_build');

// Build
spawn$('node_modules/.bin/tsc', ['-p', join(LIB_DIR, 'tsconfig.spec.json')])
  .subscribe(undefined, undefined, () => {
    // Copy styles and markup
    copyFiles(LIB_DIR, '**/*.+(scss|css|html)', join(BUILD_DIR, 'spec'));

    // Compile sass in build directory
    sync(join(BUILD_DIR, 'spec', '**/*.scss')).forEach(path => {
      const sassString = sass.renderSync({ file: path }).css.toString();
      const newPath = path.slice(0, -4) + 'css';
      writeFileSync(newPath, sassString, 'utf-8');
    });

    // Inline resources
    inlineResources(BUILD_DIR, LIB_DIR);

    // Copy to "ready to test" directory
    copyFiles(join(BUILD_DIR, 'spec'), '**/*', join(BUILD_DIR, 'spec-ready'))
  });
