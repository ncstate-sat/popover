import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

import { SatPopover } from './popover.component';
import { SatPopoverAnchor } from './popover-anchor.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    A11yModule,
  ],
  declarations: [
    SatPopover,
    SatPopoverAnchor,
  ],
  exports: [
    SatPopover,
    SatPopoverAnchor,
  ]
})
export class SatPopoverModule { }
