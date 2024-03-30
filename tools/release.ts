import * as childProcess from 'child_process';
import * as util from 'util';
import pc from 'picocolors';
import { readFileSync } from 'fs';
import { DIST_PATH, DIST_PACKAGE_PATH } from './constants';
import readline from 'readline';
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

  await exec(`npm run build:prod`);
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
