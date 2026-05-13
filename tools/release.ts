import * as util from 'util';
import pc from 'picocolors';
import { readFileSync } from 'fs';
import { DIST_PATH, DIST_PACKAGE_PATH } from './constants';
import readline from 'readline';
import * as childProcess from 'child_process';

const exec = util.promisify(childProcess.exec);

async function bumpVersion() {
  console.log(pc.green(`Bumping version with changesets`));

  // Check if master branch is checked out
  const { stdout: currentBranch } = await exec(`git branch --show-current`);
  if (currentBranch.trim() !== 'master') {
    throw new Error('Error: Not on master branch. Please checkout master branch before running release.');
  }

  // Pull latest changes
  await exec(`git pull`);

  // Clean up node_modules and package-lock.json
  await exec(`rm -rf node_modules package-lock.json`);

  // Rebuild to generate new package-lock.json
  await exec(`npm install`);

  try {
    await exec(`npx changeset version`);
    await exec(`git add .`);
    await exec(`git commit -m "chore: bump version and update changelog"`);
    await exec(`git push`);
    console.log(pc.green('Version bump and changelog commit completed'));
  } catch (e) {
    console.error(pc.red('Error during version bump. Release aborted.'));
    throw e;
  }
}

async function libBuild() {
  console.log(pc.green('Starting library build'));
  await exec(`npm run build:prod`);
}

async function gitTags() {
  console.log(pc.green('Starting tag creation'));

  const version = JSON.parse(readFileSync(DIST_PACKAGE_PATH, 'utf8')).version;

  console.log(pc.green(`Tagging release with tag v${version}`));
  await exec(`git tag v${version}`);

  console.log(pc.green(`Pushing new tags to remote`));
  await exec(`git push --tags`);

  // Create a GitHub release for the newly pushed tag
  await createGitHubRelease(version);
}

// Helper to create a GitHub release using the GitHub CLI
async function createGitHubRelease(version: string) {
  console.log(pc.green(`Creating GitHub release for v${version}`));

  try {
    // Using the latest commit message as release notes; you can replace this with a changelog extract.
    const { stdout: notes } = await exec(`git log -1 --pretty=%B`);
    await exec(`gh release create v${version} --title "Release v${version}" --notes "${notes.trim()}"`);
    console.log(pc.green('GitHub release created'));
  } catch (e) {
    console.log(pc.yellow('Failed to create GitHub release. Continuing...'));
    console.error(e);
  }
}

async function deployGhPages() {
  console.log(pc.green('Building and deploying demo to GitHub Pages'));
  await exec(`npm run build:demo`);
  await exec(`npm run gh-pages`);
  console.log(pc.green('GitHub Pages deploy completed'));
}

async function publish(otp: string | null) {
  console.log(pc.green(`Publishing`));

  const otpOpt = otp != null ? `--otp=${otp}` : '';
  const { stdout } = await exec(`npm publish ${DIST_PATH} ${otpOpt}`);
  console.log(pc.gray(stdout));

  console.log(pc.green('Publish completed'));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function release() {
  console.log(pc.green('Starting full release process'));

  await bumpVersion();
  console.log(pc.green('Version bump step completed'));

  const otpRaw = await new Promise<string>((resolve) => {
    rl.question('Enter your OTP here, or enter for none: ', resolve);
  });

  const isValidOtp = otpRaw.length === 6 && otpRaw.search(/\d{6}/) === 0;
  const otp = isValidOtp ? otpRaw : null;

  rl.close();

  await libBuild();
  console.log(pc.green('Library build step completed'));

  await gitTags();
  console.log(pc.green('Tagging step completed'));

  await deployGhPages();
  console.log(pc.green('GitHub Pages step completed'));

  await publish(otp);
  console.log(pc.green('Publish step completed'));
}

release();
