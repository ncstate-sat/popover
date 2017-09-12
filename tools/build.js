/**
 * Largely based on the build script from https://github.com/angular/angularfire2
 */
const { rollup } = require('rollup');
const { spawn } = require('child_process');
const { Observable } = require('rxjs');
const { copy, readFileSync, writeFile } = require('fs-extra');
const GLOBALS = require('./rollup-globals');
const resolve = require('rollup-plugin-node-resolve');
const pkg = require(`${process.cwd()}/package.json`);


// Directory constants
const BASE_DIR = process.cwd();
const LIB_DIR = `${BASE_DIR}/lib`;
const DEST_DIR = `${BASE_DIR}/dist/lib`;
const BUILD_DIR = `${BASE_DIR}/.ng_build`;

// Map versions across packages
const VERSIONS = {
  ANGULAR_VERSION: pkg.dependencies['@angular/core'],
  CDK_VERSION: pkg.dependencies['@angular/cdk'],
  POPOVER_VERSION: pkg.version,
};

// Constants for running typescript commands
const TSC = 'node_modules/.bin/tsc';
const NGC = 'node_modules/.bin/ngc';
const TSC_ARGS = (config = 'build') => [`-p`, `${LIB_DIR}/tsconfig-${config}.json`];
const TSC_TEST_ARGS = [`-p`, `${LIB_DIR}/tsconfig-test.json`];


/** Create an Observable from a spawned child process. */
function spawn$(command, args) {
  return Observable.create(observer => {
    const cmd = spawn(command, args);
    observer.next(''); // hack to kick things off since not every command will have an stdout
    cmd.stdout.on('data', data => { observer.next(data.toString('utf8')); });
    cmd.stderr.on('data', data => { observer.error(data.toString('utf8')); });
    cmd.on('close', code => { observer.complete(); });
  });
}

/** Replaces the version placeholders in the package and writes to destination. */
function replaceVersions$(versions) {
  return Observable.create((observer) => {
    // Read package
    const packageName = `${LIB_DIR}/package.json`;
    let package = readFileSync(packageName, 'utf8');

    // Replace
    const regexs = Object
      .keys(versions)
      .map(key => ({ expression: new RegExp(key, 'g'), key, val: versions[key] }));
    regexs.forEach(r => package = package.replace(r.expression, r.val));

    // Write to destination directory
    const destPath = `${DEST_DIR}/package.json`;
    writeFile(destPath, package, err => {
      if (err) {
        observer.error(err);
      } else {
        observer.next(package);
        observer.complete();
      }
    });
  });
}

function rollupModule(input) {
  const inputOptions = {
    input: input,
    external: Object.keys(GLOBALS),
    plugins: [resolve()],
  };

  const outputOptions = {
    file: `${DEST_DIR}/index.js`,
    format: 'es',
    name: 'popover',
    globals: GLOBALS,
  };

  return rollup(inputOptions)
    .then(bundle => bundle.write(outputOptions));
}

/** Copy the readme from the source project to the dist package. */
function copyReadme() {
  return copy(`${BASE_DIR}/README.md`, `${DEST_DIR}/README.md`);
}

/** Build the popover module. */
function buildModule$(globals, versions) {
  const es2015$ = spawn$(NGC, TSC_ARGS('build'));
  const es5$ = spawn$(NGC, TSC_ARGS('es5'));
  // const test$ = spawn$(NGC, TSC_ARGS('test'));

  return Observable
    .forkJoin(es2015$)
    .switchMap(() => Observable.from(rollupModule(`${BUILD_DIR}/es2015/index.js`)))
    // .switchMap(() => Observable.from(createUmd(name, globals)))
    // .switchMap(() => replaceVersions$(versions));
}

/** Build the modules and copy over ancillary files. */
function buildLibrary$(globals, versions) {
  return buildModule$(globals, versions)
    // .switchMap(() => Observable.from(copyReadme()));
}

buildLibrary$(GLOBALS, VERSIONS).subscribe(
  undefined,
  err => console.error('err', err),
  () => console.log('\ncomplete')
);
