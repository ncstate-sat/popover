import * as childProcess from 'child_process';
import * as util from 'util';
import pc from 'picocolors';
import { readFileSync } from 'fs';
import { DIST_PATH, DIST_PACKAGE_PATH } from './constants';
const exec = util.promisify(childProcess.exec);

async function gitTags() {
  const { version } = JSON.parse(readFileSync(DIST_PACKAGE_PATH, 'utf8'));
  console.log(pc.green(`Tagging with ${version}`));

  const { stdout: tag } = await exec(`git tag v${version}`);
  const { stdout: push } = await exec(`git push --tags`);

  if (tag) {
    console.log(pc.gray(tag));
  }

  if (push) {
    console.log(pc.gray(push));
  }
}

async function libBuild() {
  console.log(pc.green(`Building library`));

  const { stdout: build } = await exec(`npm run build:prod`);
}

async function publish() {
  console.log(pc.green(`Publishing`));

  const { stdout } = await exec(`npm publish ${DIST_PATH}`);

  console.log(pc.gray(stdout));
}

async function release() {
  await libBuild();
  await gitTags();
  await publish();
}

release();
