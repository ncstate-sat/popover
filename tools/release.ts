// tools/release.ts
//
// Versions and tags a release. Publishing happens in CI: pushing the tag
// triggers .github/workflows/release.yml, which publishes to npm and creates
// the GitHub release.
//
// Safe to re-run after a partial run: an existing release commit or tag for
// the current version is reused rather than recreated.
import { execa } from 'execa';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import pc from 'picocolors';
import { fileURLToPath } from 'url';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RELEASE_BRANCH = 'master';

async function git(args: string[]): Promise<string> {
  return (await execa('git', args, { stdio: 'pipe' })).stdout.trim();
}

async function tagExists(tagName: string): Promise<boolean> {
  try {
    await git(['rev-parse', '--verify', '--quiet', `refs/tags/${tagName}`]);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run'); // Version + checks only; no commit, tag or push
  const skipPush = args.includes('--skip-push'); // Commit + tag locally, push yourself

  const branch = await git(['branch', '--show-current']);
  if (branch !== RELEASE_BRANCH) {
    throw new Error(`Releases are cut from ${RELEASE_BRANCH}; currently on ${branch || '(detached HEAD)'}.`);
  }

  // Step 1: Version with Changesets (combines pending .changeset/*.md files)
  console.log(pc.blue('📝 Running `npx changeset version`...'));
  await execa('npx', ['changeset', 'version'], { stdio: 'inherit' });
  const version = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8')).version;
  const tagName = `v${version}`;

  console.log(pc.blue(`🏷️  Releasing ${tagName}...`));

  // Step 2: Run checks
  console.log(pc.blue('🔍 Running lint, tests and build...'));
  await execa('npm', ['run', 'lint'], { stdio: 'inherit' });
  await execa('npm', ['run', 'test'], { stdio: 'inherit' });
  await execa('npm', ['run', 'build'], { stdio: 'inherit' });

  if (dryRun) {
    console.log(pc.yellow(`\n✅ Dry run complete for ${tagName}. Revert the version changes with: git checkout -- .`));
    return;
  }

  // Step 3: Commit version + changelog (skipped if a previous run already did)
  await execa('git', ['add', '-A', 'package.json', 'CHANGELOG.md', '.changeset'], { stdio: 'inherit' });
  const staged = await git(['diff', '--cached', '--name-only']);
  if (staged) {
    console.log(pc.blue('📝 Committing version + changelog...'));
    await execa('git', ['commit', '-m', `chore(release): ${tagName}\n\nSee CHANGELOG.md for details.`], {
      stdio: 'inherit'
    });
  } else {
    console.log(pc.yellow('Nothing to commit; using the existing release commit.'));
  }

  // Step 4: Tag. Annotated so it also works when git is configured to sign tags.
  if (await tagExists(tagName)) {
    console.log(pc.yellow(`Tag ${tagName} already exists; reusing it.`));
  } else {
    console.log(pc.blue(`🏷️  Tagging ${tagName}...`));
    await execa('git', ['tag', '-a', tagName, '-m', `Release ${tagName}`], { stdio: 'inherit' });
  }

  if (skipPush) {
    console.log(pc.yellow(`\nSkipped push. When ready: git push origin ${RELEASE_BRANCH} ${tagName}`));
    return;
  }

  // Step 5: Push the branch, then the tag (the tag push triggers the Release workflow)
  console.log(pc.blue(`🚀 Pushing ${RELEASE_BRANCH} and ${tagName}...`));
  await execa('git', ['push', 'origin', RELEASE_BRANCH], { stdio: 'inherit' });
  await execa('git', ['push', 'origin', `refs/tags/${tagName}`], { stdio: 'inherit' });

  console.log(pc.green(`\n✅ ${tagName} pushed.`));
  console.log('\n📦 npm publish + GitHub release run in the Release workflow:');
  console.log('   🔗 https://github.com/ncstate-sat/popover/actions/workflows/release.yml');
  console.log('\n🌐 Demo deploys via the "Deploy to GitHub Pages" workflow: https://ncstate-sat.github.io/popover/\n');
}

main().catch((error) => {
  console.error(pc.red('❌ Release failed:'), error);
  process.exit(1);
});
