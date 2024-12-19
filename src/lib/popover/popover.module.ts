import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';

import { SatPopoverComponent, SatPopoverAnchorDirective } from './popover.component';
import { SatPopoverHoverDirective } from './popover-hover.directive';
import { DEFAULT_TRANSITION } from './tokens';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    A11yModule,
    BidiModule,
    SatPopoverComponent,
    SatPopoverAnchorDirective,
    SatPopoverHoverDirective
  ],
  providers: [
    // See http://cubic-bezier.com/#.25,.8,.25,1 for reference.
    { provide: DEFAULT_TRANSITION, useValue: '200ms cubic-bezier(0.25, 0.8, 0.25, 1)' }
  ],
  exports: [SatPopoverComponent, SatPopoverAnchorDirective, SatPopoverHoverDirective, BidiModule]
})
export class SatPopoverModule {}
