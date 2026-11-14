import { NgModule, provideZoneChangeDetection } from '@angular/core';
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

/**
 * The existing specs were written against zone-based change detection. Configure it
 * for the test environment the same way an application would at bootstrap. The
 * library itself must not provide it; see `popover-zone.spec.ts` and #364.
 */
@NgModule({ providers: [provideZoneChangeDetection()] })
class ZoneChangeDetectionTestingModule {}

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment([BrowserTestingModule, ZoneChangeDetectionTestingModule], platformBrowserTesting());
