const { Observable } = require('rxjs');
const chokidar = require('chokidar');

/** Watch a directory with chokidar. */
function watch$(directory, opts) {
  return Observable.create(observer => {
    chokidar.watch(directory, opts)
      .on('all', (event, path) => observer.next({ event, path }))
      .on('error', error => observer.error(error));
  });
}

module.exports = watch$;
