const path = require('path');
const karma = require('karma');

new karma.Server({
  configFile: path.join(__dirname, '../karma.conf.js'),
  singleRun: true,
}).start();
