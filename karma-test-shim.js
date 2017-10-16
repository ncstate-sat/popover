// /*global jasmine, __karma__, window*/
Error.stackTraceLimit = 0; // "No stacktrace"" is us11 best for testing.

// Uncomment to get full stacktrace output. Sometimes helpful, us11 not.
// Error.stackTraceLimit = Infinity; //

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// builtPaths: root paths for output ("built") files
// get from karma.config.js, then prefix with '/base/' (default is 'src/')
const builtPaths = (__karma__.config.builtPaths || ['src/']).map(p => '/base/' + p);

__karma__.loaded = () => { };

/** Whether the file is a javascript file. */
function isJsFile(path) {
  return path.slice(-3) == '.js';
}

/** Whether the file is a test. */
function isSpecFile(path) {
  return /\.spec\.(.*\.)?js$/.test(path);
}

// Is a "built" file if is JavaScript file in one of the "built" folders
function isBuiltFile(path) {
  return isJsFile(path) &&
      builtPaths.reduce((keep, bp) => keep || (path.substr(0, bp.length) === bp), false);
}

const allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);

System.config({
  paths: {
    // paths serve as alias
    'npm:': 'node_modules/'
  },
  // Base URL for System.js calls. 'base/' is where Karma serves files from.
  baseURL: 'base/.ng_build/spec',
  // Extend usual application package list with test folder
  packages: {
    rxjs: { defaultExtension: 'js' },
    '': { defaultExtension: 'js' },
    src: {
      defaultExtension: 'js',
      meta: {
        './*.js': {
          loader: 'system-loader'
        }
      }
    }
  },
  // Map the angular umd bundles
  map: {
    'system-loader': 'demo/systemjs-angular-loader.js',
    'rxjs': 'npm:rxjs',
    'src': 'src',
    ...getAngularAndTestMappings(),
    ...getCdkMappings()
  }
});

initTestBed().then(initTesting);

/** Initialize test environment. */
function initTestBed(){
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ])
  .then(([coreTesting, browserTesting]) => {
    coreTesting.TestBed.initTestEnvironment(
      browserTesting.BrowserDynamicTestingModule,
      browserTesting.platformBrowserDynamicTesting());
  });
}

/** Import all spec files and start karma. */
function initTesting () {
  return Promise.all(allSpecFiles.map(moduleName => System.import(moduleName)))
    .then(__karma__.start, __karma__.error);
}

/** Create a mapping of all the angular packages. */
function getAngularAndTestMappings() {
  const withTests = [
    'core',
    'common',
    'compiler',
    'http',
    'forms',
    'platform-browser',
    'platform-browser-dynamic'
  ];

  const withoutTests = [
    'animations',
    'animations/browser',
    'platform-browser/animations'
  ];

  const mappingWithTests = withTests.reduce((mapping, pkg) => {
    mapping[`@angular/${pkg}`] = `npm:@angular/${pkg}/bundles/${pkg}.umd.js`;
    mapping[`@angular/${pkg}/testing`] = `npm:@angular/${pkg}/bundles/${pkg}-testing.umd.js`;
    return mapping;
  }, {});

  const mappingWithoutTests = withoutTests.reduce((mapping, pkg) => {
    mapping[`@angular/${pkg}`] = `npm:@angular/${pkg.split('/')[0]}/bundles/${pkg.replace('/', '-')}.umd.js`;
    return mapping;
  }, {});

  return Object.assign({}, mappingWithTests, mappingWithoutTests);
}

/** Create a mapping of all the CDK packages. */
function getCdkMappings() {
  const packages = [
    'a11y',
    'bidi',
    'coercion',
    'collections',
    'keycodes',
    'layout',
    'observers',
    'overlay',
    'platform',
    'portal',
    'rxjs',
    'scrolling',
    'stepper',
    'table',
    'testing'
  ];

  return packages.reduce((mapping, pkg) => {
    mapping[`@angular/cdk/${pkg}`] = `npm:@angular/cdk/bundles/cdk-${pkg}.umd.js`;
    return mapping;
  }, {});
}
