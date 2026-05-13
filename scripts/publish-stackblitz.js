const { execSync } = require('child_process');

const remoteUrl = execSync('git remote get-url origin').toString().trim();

// Support both SSH (git@github.com:org/repo.git) and HTTPS formats
const match = remoteUrl.match(/github\.com[:/](.+?)(\.git)?$/);
if (!match) {
  console.error(`❌ Could not parse GitHub remote URL: ${remoteUrl}`);
  process.exit(1);
}

const repoPath = match[1];
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const url = `https://stackblitz.com/github/${repoPath}/tree/${branch}`;

console.log(`✅ StackBlitz demo: ${url}`);
