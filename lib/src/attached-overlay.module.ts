import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

import { SatAttachedOverlayComponent } from './attached-overlay.component';
import { SatOverlayAnchor } from './attached-overlay-trigger.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    A11yModule,
  ],
  declarations: [
    SatAttachedOverlayComponent,
    SatOverlayAnchor,
  ],
  exports: [
    SatAttachedOverlayComponent,
    SatOverlayAnchor,
  ]
})
export class SatAttachedOverlayModule { }
