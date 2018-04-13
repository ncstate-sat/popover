const { forkJoin } = require('rxjs');
const { debounceTime, tap, switchMap } = require('rxjs/operators');
const chalk = require('chalk');
const spawn$ = require('./utils/rx-spawn');
const watch$ = require('./utils/rx-watch');

// Imitate karma log with blue.
const log = string => console.log(chalk.blueBright('[watch]: ') + string);

watch$('src/lib', { usePolling: true })
  .pipe(
    debounceTime(300),
    tap(() => log('Building lib')),
    switchMap(() => forkJoin(spawn$('node', ['tools/build.js'])))
  )
  .subscribe(() => log('Build complete'));
