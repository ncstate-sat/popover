const { Observable } = require('rxjs');
const { spawn } = require('child_process');

/** Create an Observable from a spawned child process. */
function spawn$(command, args) {
  return Observable.create(observer => {
    const cmd = spawn(command, args);
    observer.next(''); // hack to kick things off since not every command will have an stdout
    cmd.stdout.on('data', data => { observer.next(data.toString('utf-8')); });
    cmd.stderr.on('data', data => { observer.error(data.toString('utf-8')); });
    cmd.on('close', code => { observer.complete(); });
  });
}

module.exports = spawn$;
