const sdk = require('@stackblitz/sdk');
const fs = require('fs');
const path = require('path');

// Root of the project (adjust if script placed elsewhere)
const projectDir = path.resolve(__dirname, '..');

// Recursively collect files, ignoring large directories
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = {};
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'coverage', 'tmp'].includes(entry.name)) continue;
      Object.assign(files, walk(fullPath));
    } else {
      const rel = path.relative(projectDir, fullPath);
      files[rel] = fs.readFileSync(fullPath, 'utf8');
    }
  }
  return files;
}

const projectFiles = walk(projectDir);

sdk.openProject(projectFiles, {
  title: 'ncstate-sat-popover-demo',
  description: 'Auto-generated demo for the Sat Popover library',
  template: 'angular-cli',
  // Optional: open a key file after loading
  // openFile: 'src/lib/popover/popover.component.ts'
}).then(() => {
  console.log('✅ StackBlitz project opened/updated');
}).catch(err => {
  console.error('❌ StackBlitz error:', err);
});
