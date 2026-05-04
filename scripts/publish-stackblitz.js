const https = require('https');
const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');

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
      try {
        files[rel] = fs.readFileSync(fullPath, 'utf8');
      } catch {
        // Skip binary files that can't be read as UTF-8
      }
    }
  }
  return files;
}

const projectFiles = walk(projectDir);

const params = new URLSearchParams();
params.append('project[title]', 'ncstate-sat-popover-demo');
params.append('project[description]', 'Auto-generated demo for the Sat Popover library');
params.append('project[template]', 'angular-cli');

for (const [filename, content] of Object.entries(projectFiles)) {
  params.append(`project[files][${filename}]`, content);
}

const body = params.toString();

const options = {
  hostname: 'stackblitz.com',
  path: '/run',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(body),
  },
};

const req = https.request(options, (res) => {
  const location = res.headers.location;
  if (location) {
    console.log(`✅ StackBlitz project URL: ${location}`);
    res.resume();
    return;
  }

  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    // StackBlitz embeds the project URL in the HTML response
    const match = body.match(/stackblitz\.com\/edit\/([a-z0-9-]+)/i);
    if (match) {
      console.log(`✅ StackBlitz project URL: https://stackblitz.com/edit/${match[1]}`);
    } else {
      console.log(`Status: ${res.statusCode}`);
      console.log('Response headers:', res.headers);
      console.log('Body snippet:', body.slice(0, 500));
      console.error('❌ Could not determine StackBlitz project URL');
      process.exit(1);
    }
  });
});

req.on('error', (err) => {
  console.error('❌ StackBlitz error:', err);
  process.exit(1);
});

req.write(body);
req.end();
