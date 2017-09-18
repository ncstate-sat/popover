/**
 * Largely based on the build script from https://github.com/angular/angularfire2
 */
const { rollup } = require('rollup');
const { spawn } = require('child_process');
const { Observable } = require('rxjs');
const { copy, readFileSync, writeFile } = require('fs-extra');
const { join } = require('path');
const resolve = require('rollup-plugin-node-resolve');

const pkg = require(join(process.cwd(), 'package.json'));
const GLOBALS = require('./rollup-globals');
const copyFiles = require('./copy-files');

// Directory constants
const BASE_DIR = process.cwd();
const LIB_DIR = join(BASE_DIR, 'lib');
const DIST_DIR = join(BASE_DIR, 'dist/lib');
const BUILD_DIR = join(BASE_DIR, '.ng_build');

// Map versions across packages
const VERSIONS = {
  ANGULAR_VERSION: pkg.dependencies['@angular/core'],
  CDK_VERSION: pkg.dependencies['@angular/cdk'],
  POPOVER_VERSION: pkg.version,
};

// Constants for running typescript commands
const NGC = 'node_modules/.bin/ngc';
const NGC_ARGS = (config = 'build') => [`-p`, join(LIB_DIR, `tsconfig-${config}.json`)];


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

/** Replaces the version placeholders in the specified package. */
function replacePackageVersions$(packagePath, versions) {
  return Observable.create((observer) => {
    // Read package
    let package = readFileSync(packagePath, 'utf8');

    // Replace
    const regexs = Object
      .keys(versions)
      .map(key => ({ expression: new RegExp(key, 'g'), key, val: versions[key] }));
    regexs.forEach(r => package = package.replace(r.expression, r.val));

    // Write back
    writeFile(packagePath, package, err => {
      if (err) {
        observer.error(err);
      } else {
        observer.next(package);
        observer.complete();
      }
    });
  });
}

function rollup$(input, output, format) {
  const inputOptions = {
    input: input,
    external: Object.keys(GLOBALS),
    plugins: [resolve()],
  };

  const outputOptions = {
    file: output,
    format: format,
    name: 'popover',
    globals: GLOBALS,
  };

  return Observable.from(
    rollup(inputOptions)
      .then(bundle => bundle.write(outputOptions))
  );
}


/** Build the library and copy over files. */
function buildLibrary$(globals, versions) {
  return Observable
    // Compile to build folder for es2015 and es5
    .forkJoin(
      spawn$(NGC, NGC_ARGS('build')),
      spawn$(NGC, NGC_ARGS('es5'))
    )
    // Rollup
    .switchMap(() => Observable.forkJoin(
      rollup$(join(BUILD_DIR, 'es2015/popover.js'), join(DIST_DIR, '@sat/popover.js'), 'es'),
      rollup$(join(BUILD_DIR, 'es5/popover.js'), join(DIST_DIR, '@sat/popover.es5.js'), 'es'),
      rollup$(join(BUILD_DIR, 'es5/popover.js'), join(DIST_DIR, 'bundles/popover.js'), 'umd')
    ))
    //
    // TODO sourcemaps. May need 'sorcery' for that.
    //
    // Copy typings/metadata/package/readme to dist folder
    .switchMap(() => {
      copyFiles(join(BUILD_DIR, 'es2015'), '**/*.+(d.ts|metadata.json)', DIST_DIR);
      copyFiles(BASE_DIR, 'README.md', DIST_DIR);
      copyFiles(LIB_DIR, 'package.json', DIST_DIR);
      return replacePackageVersions$(join(DIST_DIR, 'package.json'), versions);
    })
}

// Kick it off
buildLibrary$(GLOBALS, VERSIONS).subscribe(
  undefined,
  err => console.error('err', err),
  () => console.log('\ncomplete')
);
