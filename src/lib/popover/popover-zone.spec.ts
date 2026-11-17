import { Component, NgZone, ViewChild, inject, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { describe, it, expect, afterEach } from 'vitest';

import { SatPopoverModule } from './popover.module';
import { SatPopoverComponent } from './popover.component';
import { SAT_POPOVER_ANIMATIONS } from './tokens';

const disableAnimations = { provide: SAT_POPOVER_ANIMATIONS, useValue: { animationsDisabled: true } };

/** Standalone component that imports the module directly (scenario 3 in #364). */
@Component({
  selector: 'zone-direct-host',
  imports: [SatPopoverModule],
  template: `<button [satPopoverAnchor]="p">Anchor</button><sat-popover #p>Popover</sat-popover>`
})
class DirectImportHostComponent {
  ngZone = inject(NgZone);
}

/** Standalone component that is imported but never rendered (scenario 4 in #364). */
@Component({
  selector: 'zone-intermediate',
  imports: [SatPopoverModule],
  template: `<sat-popover>Unused</sat-popover>`
})
class IntermediateComponent {}

@Component({
  selector: 'zone-transitive-host',
  imports: [IntermediateComponent],
  template: `<p>Intermediate is imported, not rendered.</p>`
})
class TransitiveImportHostComponent {
  ngZone = inject(NgZone);
}

/** Records whether `runOutsideAngular` really leaves the Angular zone. */
function runsOutsideAngular(zone: NgZone): boolean {
  let inAngularZone = true;
  zone.runOutsideAngular(() => (inAngularZone = NgZone.isInAngularZone()));
  return !inAngularZone;
}

describe('SatPopoverModule change detection (#364)', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('does not create a nested NgZone when imported by a standalone component', () => {
    TestBed.configureTestingModule({ imports: [DirectImportHostComponent], providers: [disableAnimations] });
    const fixture = TestBed.createComponent(DirectImportHostComponent);

    expect(fixture.componentInstance.ngZone).toBe(TestBed.inject(NgZone));
    expect(runsOutsideAngular(fixture.componentInstance.ngZone)).toBe(true);
  });

  it('does not create a nested NgZone through a transitive standalone import', () => {
    TestBed.configureTestingModule({ imports: [TransitiveImportHostComponent], providers: [disableAnimations] });
    const fixture = TestBed.createComponent(TransitiveImportHostComponent);

    expect(fixture.componentInstance.ngZone).toBe(TestBed.inject(NgZone));
    expect(runsOutsideAngular(fixture.componentInstance.ngZone)).toBe(true);
  });
});

@Component({
  selector: 'zoneless-host',
  imports: [SatPopoverModule],
  template: `
    <button [satPopoverAnchor]="p">Anchor</button>
    <sat-popover #p horizontalAlign="after" verticalAlign="below">Zoneless popover</sat-popover>
  `
})
class ZonelessHostComponent {
  @ViewChild(SatPopoverComponent, { static: true }) popover!: SatPopoverComponent;
}

describe('SatPopover in a zoneless application', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('opens, applies alignment classes and closes without Zone.js change detection', async () => {
    TestBed.configureTestingModule({
      imports: [ZonelessHostComponent],
      providers: [provideZonelessChangeDetection(), disableAnimations]
    });
    const fixture = TestBed.createComponent(ZonelessHostComponent);
    const overlayContainer = TestBed.inject(OverlayContainer).getContainerElement();
    await fixture.whenStable();

    fixture.componentInstance.popover.open();
    await fixture.whenStable();

    expect(overlayContainer.textContent).toContain('Zoneless popover');
    const panel = overlayContainer.querySelector('.sat-popover-container');
    expect(panel?.classList).toContain('sat-popover-after');
    expect(panel?.classList).toContain('sat-popover-below');

    // Simulate the CDK switching to a fallback position (e.g. on scroll), which
    // happens outside any change detection cycle.
    fixture.componentInstance.popover._setAlignmentClasses('before', 'above');
    await fixture.whenStable();

    expect(panel?.classList).toContain('sat-popover-before');
    expect(panel?.classList).toContain('sat-popover-above');

    fixture.componentInstance.popover.close();
    await fixture.whenStable();

    expect(fixture.componentInstance.popover.isOpen()).toBe(false);
  });
});
