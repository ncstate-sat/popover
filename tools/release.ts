import * as util from 'util';
import pc from 'picocolors';
import { readFileSync } from 'fs';
import { DIST_PATH, DIST_PACKAGE_PATH } from './constants';
import readline from 'readline';
import * as childProcess from 'child_process';

const exec = util.promisify(childProcess.exec);

async function bumpVersion() {
  console.log(pc.green(`Bumping version with changesets`));
  try {
    await exec(`npx changeset version`);
    await exec(`git add .`);
    await exec(`git commit -m "chore: bump version and update changelog"`);
  } catch (e) {
    console.log(pc.yellow('No changesets found or error during version bump. Skipping...'));
  }
}

async function libBuild() {
  console.log(pc.green(`Building library`));

  await exec(`npm run build:prod`);
}

async function gitTags() {
  console.log(pc.green(`Tagging release`));

  const version = JSON.parse(readFileSync(DIST_PACKAGE_PATH, 'utf8')).version;

  await exec(`git tag v${version}`);
  await exec(`git push --tags`);
}

async function publish(otp: string | null) {
  console.log(pc.green(`Publishing`));

  const otpOpt = otp != null ? `--otp=${otp}` : '';
  const { stdout } = await exec(`npm publish ${DIST_PATH} ${otpOpt}`);

  console.log(pc.gray(stdout));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function release() {
  await bumpVersion();

  const otpRaw = await new Promise<string>((resolve) => {
    rl.question('Enter your OTP here, or enter for none: ', resolve);
  });

  const isValidOtp = otpRaw.length === 6 && otpRaw.search(/\d{6}/) === 0;
  const otp = isValidOtp ? otpRaw : null;

  rl.close();

  await libBuild();
  await gitTags();
  await publish(otp);
}

release();
