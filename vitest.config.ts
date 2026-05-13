/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [angular({ tsconfig: resolve(__dirname, 'src/lib/tsconfig.spec.json') })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['@analogjs/vitest-angular/setup-zone', 'src/lib/test-setup.ts'],
    include: ['src/lib/**/*.spec.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: 'coverage',
      reporter: ['html', 'lcov']
    }
  }
});
