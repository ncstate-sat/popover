import chalk from 'chalk';
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import {
  DIST_PACKAGE_PATH,
  SOURCE_PACKAGE_PATH,
  PEER_DEPENDENCIES,
  PACKAGE_PROPERTIES,
  DIST_README_PATH,
  SOURCE_README_PATH
} from './constants';

interface PackageData {
  version: string;
  dependencies: { [key: string]: string };
  properties: { [key: string]: any };
}

/** Pull required data from the source package.json. */
function getSourceData(dependencyKeys: string[], propertyKeys: string[]): PackageData {
  const pick = (obj, props) => Object.assign({}, ...props.map(prop => ({[prop]: obj[prop]})));
  const src = JSON.parse(readFileSync(SOURCE_PACKAGE_PATH, 'utf8'));

  // package version
  const { version } = src;

  // dependencies
  const allDependencies = { ...src.dependencies, ...src.devDependencies, ...src.peerDependencies };
  const dependencies = pick(allDependencies, dependencyKeys);

  // generic properties
  const properties = pick(src, propertyKeys);

  return { version, dependencies, properties };
}

/** Override the dist package.json with the given data. */
function replaceDistData(properties: { [key: string]: any }): void {
  const dist = JSON.parse(readFileSync(DIST_PACKAGE_PATH, 'utf8'));
  const out = { ...dist, ...properties };
  writeFileSync(DIST_PACKAGE_PATH, JSON.stringify(out, null, 2));
}

/** Replace values from the src package to the dist. */
function replacePackageValues(): void {
  console.log(chalk.cyan('Overwriting package.json properties in dist'));
  const src = getSourceData(PEER_DEPENDENCIES, PACKAGE_PROPERTIES);
  return replaceDistData({
    version: src.version,
    peerDependencies: src.dependencies,
    ...src.properties
  });
}

/** Copy README to dist. */
function copyReadme(): void {
  console.log(chalk.cyan('Copying README.md to dist package'));
  return copyFileSync(SOURCE_README_PATH, DIST_README_PATH);
}

replacePackageValues();
copyReadme();
