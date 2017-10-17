const { Observable } = require('rxjs');
const chokidar = require('chokidar');
const spawn$ = require('./utils/rx-spawn');

/** Watch a directory with chokidar. */
function watch$(directory, opts) {
  return Observable.create(observer => {
    chokidar.watch(directory, opts)
      .on('all', (event, path) => observer.next({ event, path }))
      .on('error', error => observer.error(error));
  });
}

watch$('src/lib', { usePolling: true })
  .debounceTime(300)
  .subscribe(() => {
    console.log('building...');
    // this is hacky but it gets the job done for now
    spawn$('node', ['tools/build.js'])
      .subscribe(undefined, undefined, () => console.log('build complete'));
  });
