// tools/release.ts
import { execa } from 'execa';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import pc from 'picocolors';
import { fileURLToPath } from 'url';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createGitHubRelease(version: string) {
  console.log(pc.green(`\nCreating GitHub release for v${version}`));

  try {
    // Use Changesets-generated CHANGELOG.md for release notes
    const changelogPath = resolve(__dirname, '..', 'CHANGELOG.md');
    const fullChangelog = readFileSync(changelogPath, 'utf8');

    // Extract only the latest version section (up to next `##` or EOF)
    const [header, ...rest] = fullChangelog.split('\n');
    const lines = rest.join('\n');
    const changelogForVersion = lines
      .split('\n')
      .reduce<string[]>((acc, line) => {
        if (line.startsWith('## ') && acc.length > 0) return acc; // Stop at next version
        if (acc.length > 0 || line.trim()) acc.push(line); // Include first line & non-blank lines after version header
        return acc;
      }, [])
      .slice(0, -1) // Remove trailing newline
      .join('\n')
      .trim();

    // Fallback: if no CHANGELOG, use last commit message
    const notes =
      changelogForVersion || (await execa('git', ['log', '-1', '--pretty=%B'], { stdio: 'pipe' })).stdout.trim();

    await execa('gh', ['release', 'create', `v${version}`, '--title', `Release v${version}`, '--notes', notes], {
      stdio: 'inherit'
    });
    console.log(pc.green('✅ GitHub release created'));
  } catch (e: any) {
    console.log(pc.yellow('⚠️ Failed to create GitHub release. Continuing...'));
    console.error(e.message || e);
    // Don't fail the whole release — GitHub Pages still deploys
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run'); // Dry-run
  const skipTag = args.includes('--skip-tag');
  const skipRelease = args.includes('--skip-release'); // Skip gh release create

  // Step 1: Version with Changesets
  console.log(pc.blue('📝 Running `npx changeset version`...'));
  await execa('npx', ['changeset', 'version'], { stdio: 'inherit' });
  const tagName = `v${JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8')).version}`;
  const version = tagName.replace('v', '');

  console.log(pc.blue(`🏷️  New tag: ${tagName} for new version ${version}...`));

  // Step 2: Run checks
  console.log(pc.blue('🔍 Running lint and tests...'));
  await execa('npm', ['run', 'lint'], { stdio: 'inherit' });
  await execa('npm', ['run', 'test'], { stdio: 'inherit' });
  await execa('npm', ['run', 'build'], { stdio: 'inherit' });

  // Step 3: Commit + Tag (if not --dry-run)
  if (!dryRun) {
    console.log(pc.blue('📝 Committing version + changelog...'));
    await execa('git', ['add', '.'], { stdio: 'inherit' });

    const commitMsg = `chore(release): ${tagName} [skip ci]\n\nSee .changeset/*.md for details.`;
    await execa('git', ['commit', '-m', commitMsg], { stdio: 'inherit' });

    if (!skipTag) {
      console.log(pc.blue(`🏷️  Tagging ${tagName}...`));
      await execa('git', ['tag', '-f', tagName], { stdio: 'inherit' }); // force to overwrite stale tags
    }

    console.log(pc.blue(`🚀 Pushing to origin/main and tags...`));
    await execa('git', ['push', 'origin', 'master', '--tags', '--force-with-lease'], { stdio: 'inherit' });

    console.log('\n✅ New tag pushed!');
  }

  // Step 4: Create GitHub release (optional: --skip-release)
  if (!skipRelease && !dryRun) {
    try {
      await createGitHubRelease(version);
    } catch (e) {
      console.log(pc.yellow('Failed to create GitHub release. Continuing...'));
      console.error(e);
    }
  }

  console.log('\n✅ Release v' + version + ' prepared' + (dryRun ? ' (dry-run)' : '') + '!');
  console.log('\n🌐 Deployment will auto-start via GitHub Actions:');
  console.log('   🔗 https://github.com/ncstate-sat/popover/actions?query=workflow%3A%22Deploy+to+GitHub+Pages%22');
  console.log('\n📦 Live at: https://ncstate-sat.github.io/popover/\n');
}

main().catch((error) => {
  console.error(pc.red('❌ Release failed:'), error);
  process.exit(1);
});
