// To publish:
// 1. Check out a branch and edit package version and add changelog entry
// 2. Run `npm install` again to update package-lock.json
// 3. Open PR and merge into `master`
// 4. `git checkout master && git pull origin master``
// 5. Make sure everything is 👌
// 6. Run this script via `npm run release`
// 7. Build and publish the demo app `npm run build:demo && npm run gh-pages`
// 8. Update all the official StackBlitz demos
// 9. Edit release on Github

import * as childProcess from 'child_process';
import * as util from 'util';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { DIST_PATH, DIST_PACKAGE_PATH } from './constants';
const exec = util.promisify(childProcess.exec);

async function gitTags() {
  const { version } = JSON.parse(readFileSync(DIST_PACKAGE_PATH, 'utf8'));
  console.log(chalk.green(`Tagging with ${version}`));

  const { stdout: tag } = await exec(`git tag v${version}`);
  const { stdout: push } = await exec(`git push --tags`);

  if (tag) {
    console.log(chalk.gray(tag));
  }

  if (push) {
    console.log(chalk.gray(push));
  }
}

async function libBuild() {
  console.log(chalk.green(`Building library`));

  const { stdout: build } = await exec(`npm run build`);
}

async function publish() {
  console.log(chalk.green(`Publishing`));

  const { stdout } = await exec(`npm publish ${DIST_PATH}`);

  console.log(chalk.gray(stdout));
}

async function release() {
  await libBuild();
  await gitTags();
  await publish();
}

release();
