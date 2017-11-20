const { sync } = require('glob');
const { join } = require('path');
const { writeFileSync } = require('fs-extra');
const sass = require('node-sass');

const copyFiles = require('./utils/copy-files');
const inlineResources = require('./utils/inline-resources');
const spawn$ = require('./utils/rx-spawn');

/** Project directory */
const BASE_DIR = process.cwd();
/** Source directory. */
const LIB_DIR = join(BASE_DIR, 'src/lib');
/** Build output directory where sass compilation and inlining will occur. */
const TMP_DIR = join(BASE_DIR, '.ng_build', '.spec-tmp');
/** Final build output directory. */
const BUILD_DIR = join(BASE_DIR, '.ng_build', 'spec');

/** Typescript process */
const TSC = 'node_modules/.bin/tsc';
/** Args to use when calling TSC process */
const TSC_ARGS = ['-p', join(LIB_DIR, 'tsconfig.spec.json')];

/** Copy, compile, and inline resources. */
function cleanupResources() {
  // Copy styles and markup from lib source into tmp directory
  copyFiles(LIB_DIR, '**/*.+(scss|css|html)', TMP_DIR);

  // Compile sass in tmp directory
  sync(join(TMP_DIR, '**/*.scss')).forEach(path => {
    const sassString = sass.renderSync({ file: path }).css.toString();
    const newPath = path.slice(0, -4) + 'css';
    writeFileSync(newPath, sassString, 'utf-8');
  });

  // Inline resources
  inlineResources(TMP_DIR, LIB_DIR);

  // Copy compiled tmp directory to "ready to test" build directory
  copyFiles(TMP_DIR, '**/*', BUILD_DIR);
}

// Compile typescript and then clean up resources
spawn$(TSC, TSC_ARGS)
  .subscribe(undefined, undefined, cleanupResources);
