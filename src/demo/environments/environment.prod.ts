const { version } = require('../../../package.json');

declare const require: any;

export const environment = {
  production: true,
  version,
};
