import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// paths
export const SOURCE_PACKAGE_PATH = join(__dirname, '..', 'package.json');
export const SOURCE_README_PATH = join(__dirname, '..', 'README.md');
export const DIST_PATH = join(__dirname, '..', 'dist', 'popover');
export const DIST_PACKAGE_PATH = join(DIST_PATH, 'package.json');
export const DIST_README_PATH = join(DIST_PATH, 'README.md');

// config
export const PEER_DEPENDENCIES = ['@angular/common', '@angular/core', '@angular/cdk'];
export const PACKAGE_PROPERTIES = ['keywords', 'repository', 'bugs', 'homepage'];
