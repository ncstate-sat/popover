import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';

const thisFile = fileURLToPath(import.meta.url);
const libRoot = join(dirname(thisFile), '..');

// Built at runtime so the needle does not appear literally in the scanned text.
const forbiddenImport = ['@angular', 'animations'].join('/');

function collectTsFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      return collectTsFiles(full);
    }

    return entry.isFile() && full.endsWith('.ts') ? [full] : [];
  });
}

describe('@angular/animations removal', () => {
  it('is not referenced anywhere in the library source', () => {
    const offenders = collectTsFiles(libRoot)
      // This guard names the package in its own assertions, so it cannot scan itself.
      .filter((file) => file !== thisFile)
      .filter((file) => readFileSync(file, 'utf8').includes(forbiddenImport))
      .map((file) => relative(libRoot, file));

    expect(offenders).toEqual([]);
  });
});
