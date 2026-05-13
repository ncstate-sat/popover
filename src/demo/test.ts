// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

// CDK InteractivityChecker uses offsetWidth/offsetHeight to determine element
// visibility. jsdom always returns 0 for these, so we stub them to allow focus
// management (autoFocus, restoreFocus) to work in tests.
Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  get() {
    return 1;
  }
});
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  get() {
    return 1;
  }
});

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
