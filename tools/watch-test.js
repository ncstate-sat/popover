const { Observable } = require('rxjs');
const chalk = require('chalk');
const spawn$ = require('./utils/rx-spawn');
const watch$ = require('./utils/rx-watch');

// Imitate karma log with blue.
const log = string => console.log(chalk.blueBright('[watch-test]: ') + string);

watch$('src/lib', { usePolling: true })
  .debounceTime(300)
  .do(() => log('Building spec files'))
  .switchMap(() => Observable.forkJoin(spawn$('node', ['tools/build-test.js'])))
  .subscribe(() => log('Build complete'));
