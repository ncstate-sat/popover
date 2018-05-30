import { join } from 'path';

// paths
export const SOURCE_PACKAGE_PATH = join(__dirname, '..', 'package.json');
export const SOURCE_README_PATH = join(__dirname, '..', 'README.md');
export const DIST_PATH = join(__dirname, '..', 'dist', 'popover');
export const DIST_PACKAGE_PATH = join(DIST_PATH, 'package.json');
export const DIST_README_PATH = join(DIST_PATH, 'README.md');

// config
export const PEER_DEPENDENCIES = ['@angular/common', '@angular/core', '@angular/cdk'];
export const PACKAGE_PROPERTIES = ['keywords', 'repository', 'bugs', 'homepage'];
